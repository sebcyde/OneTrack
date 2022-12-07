import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './Styles/Main.scss';
import React from 'react';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
