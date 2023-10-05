import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
	return (
		<ul className="self-end flex flex-col justify-between h-[30vh]">
			<NavLink
				id="homelink"
				to="/pages/dashboard"
				className={(nav) =>
					nav.isActive
						? 'cursor-pointer text-xl font-bold text-custom-orange'
						: 'cursor-pointer text-xl'
				}>
				<li>
					<i className="fas fa-home"></i>
				</li>
			</NavLink>

			<NavLink
				id="calendarlink"
				to="/pages/calendar"
				className={(nav) =>
					nav.isActive
						? 'cursor-pointer text-xl font-bold text-custom-orange'
						: // : 'cursor-pointer text-xl'
						  'cursor-default text-xl'
				}>
				<li style={{ opacity: '0.3' }}>
					<i className="fas fa-calendar-alt"></i>
				</li>
			</NavLink>

			<NavLink
				id="overviewlink"
				to="/pages/overview"
				className={(nav) =>
					nav.isActive
						? 'cursor-pointer text-xl font-bold text-custom-orange'
						: // : 'cursor-pointer text-xl'
						  'cursor-default text-xl'
				}>
				<li style={{ opacity: '0.3' }}>
					<i className="fas fa-eye"></i>
				</li>
			</NavLink>

			<li
				id="addWorkspaceOrTaskButton"
				className="cursor-pointer text-xl">
				<i className="fas fa-plus-square"></i>
			</li>
		</ul>
	);
};

export default Navigation;
