import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
	return (
		<div className="grid grid-rows-[1fr,4fr,5fr] h-screen p-[20px] w-[90px]">
			<div className="self-start">
				<img
					src="../img/logo-tm-official.png"
					alt="logo"
					className="h-15 w-15 mx-auto"
				/>
			</div>

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

			<ul className="self-end flex flex-col justify-between h-[11vh]">
				<li
					id="paramsLink"
					className="cursor-default text-xl"
					style={{ opacity: '0.3' }}>
					<i className="fas fa-cog"></i>
				</li>

				<li
					id="logoutLink"
					className="cursor-default text-xl"
					style={{ opacity: '0.3' }}>
					<i className="fas fa-sign-out-alt"></i>
				</li>
			</ul>
		</div>
	);
};

export default SideBar;
