import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Error404 from './pages/Error404';
import Error500 from './pages/Error500';
import Dashboard from './pages/Dashboard';
import Workspaces from './pages/Workspaces';
import ResetPassword from './pages/ResetPassword';
import Tasks from './pages/Tasks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
		<div>
			<ToastContainer autoClose={600} />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="*" element={<Error404 />} />
					<Route path="/pages/error" element={<Error />} />
					<Route path="/pages/error-404" element={<Error404 />} />
					<Route path="/pages/error-500" element={<Error500 />} />
					<Route
						path="/pages/reset-password"
						element={<ResetPassword />}
					/>
					<Route path="/pages/dashboard" element={<Dashboard />} />
					<Route path="/pages/workspaces" element={<Workspaces />} />
					<Route path="/pages/tasks" element={<Tasks />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
