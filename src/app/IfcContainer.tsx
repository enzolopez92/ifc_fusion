import React, { useEffect, createRef, useState, forwardRef } from 'react';

import {
	Popover,
	Divider,
	Grid,
	Typography,
	Button
} from '@mui/material';

import { IFCSLAB } from "web-ifc";
import { IfcViewerAPI } from 'web-ifc-viewer';

interface IfcRecord {
	[key: string]: string;
}

interface IfcContainerProps {
	viewer?: IfcViewerAPI;
}
const IfcContainer = forwardRef<HTMLDivElement, IfcContainerProps>((props, ref) => {

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [curIfcRecords, setIfcRecords] = useState<IfcRecord>();

	const viewer = props.viewer;
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const handleClose = () => {
		setAnchorEl(null);
	};

	const ifcOnClick = async (event) => {
		if (viewer) {
			const result = await viewer.IFC.pickIfcItem(true);
			if (result) {
				const props = await viewer.IFC.getProperties(result.modelID, result.id, false);
				const type = await viewer.IFC.loader.ifcManager.getIfcType(result.modelID, result.id);
				console.log(props, type, result);
				// convert props to record and display inside the Popover (modal/popover)
				if (props) {
					let ifcRecords: IfcRecord = {};
					ifcRecords['Entity Type'] = type;
					ifcRecords['GlobalId'] = props.GlobalId && props.GlobalId?.value;
					ifcRecords['Name'] = props.Name && props.Name?.value;
					ifcRecords['ObjectType'] = props.ObjectType && props.ObjectType?.value;
					ifcRecords['PredefinedType'] = props.PredefinedType && props.PredefinedType?.value;
					setIfcRecords(ifcRecords);
				}

				setAnchorEl(event.target);
			}
		}
	};

	const ifcOnRightClick = async () => {
		if (viewer) {
			viewer.clipper.deleteAllPlanes();
			viewer.clipper.createPlane();
		}
	}

	return (
		<>
			<div className={'ifcContainer'}
				ref={ref}
				onDoubleClick={ifcOnClick}
				onContextMenu={ifcOnRightClick}
				onMouseMove={viewer && (() => viewer.IFC.selector.prePickIfcItem())}
			/>
			<Popover id={id} open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<Grid container component='dl' spacing={2} sx={{ p: 2 }}>
					<Grid item>
						{curIfcRecords && Object.keys(curIfcRecords).map((key) =>
							curIfcRecords[key] &&
							<React.Fragment key={key}>
								<Typography component='dt' variant='body2'>{key}</Typography>
								<Typography sx={{ pb: 1 }} component='dd'>{curIfcRecords[key]}</Typography>
							</React.Fragment>
						)}
					</Grid>
				</Grid>
				<Divider />
				{/* <Grid container spacing={2} sx={{ p: 2 }}>
					<Button variant="contained">ADD Design</Button>
				</Grid> */}
			</Popover>
		</>
	);
});

export { IfcContainer };
