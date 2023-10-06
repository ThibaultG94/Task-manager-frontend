import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderNav = () => {
	return (
		<ul className="flex items-center justify-between w-[350px] absolute left-[40%] top[25px]">
			<NavLink
				to="/pages/dashboard"
				className={(nav) =>
					nav.isActive ? 'font-bold text-orange-primary' : ''
				}>
				<li className="cursor-pointer">
					<h3 className="text-[1.3rem]">Dashboard</h3>
				</li>
			</NavLink>

			<NavLink
				to="/pages/tasks"
				className={(nav) =>
					nav.isActive ? 'font-bold text-custom-orange' : ''
				}>
				<li className="cursor-pointer">
					<h3 className="text-[1.3rem]">Tasks</h3>
				</li>
			</NavLink>

			<NavLink
				to="/pages/workspaces"
				className={(nav) =>
					nav.isActive ? 'font-bold text-custom-orange' : ''
				}>
				<li className="cursor-pointer">
					<h3 className="text-[1.3rem]">Workspaces</h3>
				</li>
			</NavLink>
		</ul>
	);
};

export default HeaderNav;
