import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

class ClientList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			clients: []
		};
	}

	componentDidMount() {
		fetch("http://10.17.10.59:8001/api/client")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						clients: result
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}

	render() {

		const { error, isLoaded, clients } = this.state;

		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<TableContainer>
					<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell>Id</TableCell>
								<TableCell>Name</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{clients.map((row) => (
								<TableRow
									key={row.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">{row.id}</TableCell>
									<TableCell component="th" scope="row">{row.name}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			);
		}
	}
}

export { ClientList };