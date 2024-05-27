import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { SocketProvider } from './context/SocketContext';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<SocketProvider>
			<App />
		</SocketProvider>
	</Provider>
);
