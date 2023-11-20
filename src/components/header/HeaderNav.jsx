import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderNav = () => {
	return (
		<nav className="absolute flex h-full items-center justify-between left-1/3 top-0">
			<NavLink
				to="/pages/dashboard"
				className={(nav) =>
					nav.isActive
						? 'font-bold text-orange-primary mr-6 pl-10'
						: 'mr-6 pl-10'
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
