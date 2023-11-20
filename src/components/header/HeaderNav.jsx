import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderNav = () => {
	return (
		<nav className="flex items-center justify-between absolute left-[40%] top-[25px]">
			<NavLink
				to="/pages/dashboard"
				className={(nav) =>
					nav.isActive ? 'font-bold text-orange-primary mr-6' : 'mr-6'
				}>
				<li className="cursor-pointer">
					<h3 className="text-[1.3rem]">Dashboard</h3>
				</li>
			</NavLink>

			<NavLink
				to="/pages/tasks"
				className={(nav) =>
					nav.isActive ? 'font-bold text-orange-primary mr-6' : 'mr-6'
				}>
				<li className="cursor-pointer">
					<h3 className="text-[1.3rem]">Tasks</h3>
				</li>
			</NavLink>

			<NavLink
				to="/pages/workspaces"
				className={(nav) =>
					nav.isActive ? 'font-bold text-orange-primary' : ''
				}
				style={{ display: 'none' }}>
				<li className="cursor-pointer">
					<h3 className="text-[1.3rem]">Workspaces</h3>
				</li>
			</NavLink>
		</nav>
	);
};

export default HeaderNav;
