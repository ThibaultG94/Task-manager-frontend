import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import CreateTaskAndWorkspace from './CreateTaskAndWorkspace';

const Navigation = ({ userId }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const location = useLocation();

	const isActiveLink = (paths) => {
		return paths.includes(location.pathname);
	};

	return (
		<nav className="flex flex-row xl:flex-col justify-between self-center xl:self-end xl:w-full">
			<NavLink
				id="homelink"
				to="/pages/dashboard"
				className={() =>
					isActiveLink([
						'/pages/dashboard',
						'/pages/tasks',
						'/pages/workspaces',
					])
						? 'cursor-pointer text-xl font-bold xl:mb-6 mr-6 xl:mr-0 text-orange-primary'
						: 'cursor-pointer text-xl xl:mb-6 mr-6 xl:mr-0'
				}>
				<li>
					<i className="fas fa-home mr-1"></i>
				</li>
			</NavLink>

			<NavLink
				id="calendarlink"
				to="/pages/calendar"
				className={(nav) =>
					nav.isActive
						? 'cursor-pointer text-xl font-bold mb-6 text-custom-orange'
						: // : 'cursor-pointer text-xl'
						  'cursor-default text-xl mb-6'
				}
				style={{ display: 'none' }}>
				<li>
					<i className="fas fa-calendar-alt mr-1"></i>
				</li>
			</NavLink>

			<NavLink
				id="overviewlink"
				to="/pages/overview"
				className={(nav) =>
					nav.isActive
						? 'cursor-pointer text-xl font-bold text-custom-orange mb-6'
						: // : 'cursor-pointer text-xl'
						  'cursor-default text-xl mb-6'
				}
				style={{ display: 'none' }}>
				<li>
					<i className="fas fa-eye mr-1"></i>
				</li>
			</NavLink>

			<li
				id="addWorkspaceOrTaskButton"
				className="cursor-pointer text-xl"
				onClick={() => setIsModalOpen(true)}>
				<i className="fas fa-plus-square mr-1"></i>
			</li>

			{isModalOpen && (
				<CreateTaskAndWorkspace
					userId={userId}
					setIsModalOpen={setIsModalOpen}
				/>
			)}
		</nav>
	);
};

export default Navigation;
