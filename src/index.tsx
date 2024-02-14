import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './app/App';
import { ClientList } from './app/ClientList';

ReactDOM.render(
	<React.StrictMode>
		<App />
		{/* <ClientList /> */}
	</React.StrictMode>,
	document.getElementById('root')
);