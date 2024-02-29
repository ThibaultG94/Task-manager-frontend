import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/errors/ErrorPage';
import ErrorPage404 from './pages/errors/ErrorPage404';
import ErrorPage500 from './pages/errors/ErrorPage500';
import DashboardPage from './pages/DashboardPage';
// import WorkspacesPage from './pages/WorkspacesPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import TasksPage from './pages/TasksPage';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate replace to="/home" />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="*" element={<ErrorPage404 />} />
				<Route path="/pages/error" element={<ErrorPage />} />
				<Route path="/pages/error-404" element={<ErrorPage404 />} />
				<Route path="/pages/error-500" element={<ErrorPage500 />} />
				<Route
					path="/pages/reset/:token"
					element={<ResetPasswordPage />}
				/>
				<Route path="/pages/dashboard" element={<DashboardPage />} />
				{/* <Route path="/pages/workspaces" element={<WorkspacesPage />} /> */}
				<Route path="/pages/tasks" element={<TasksPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
