import React from 'react';
import { useLogoutUser } from '../../api/logoutUser';

const Footer = () => {
	const logoutUser = useLogoutUser();

	const handleLogout = async () => {
		await logoutUser();
	};

	return (
		<ul className="self-end flex flex-col justify-between">
			<li
				className="cursor-default mb-6 text-xl"
				id="paramsLink"
				style={{ display: 'none' }}>
				<i className="fas fa-cog mr-1"></i>
			</li>

			<li
				className="cursor-pointer text-xl"
				id="logoutLink"
				onClick={handleLogout}>
				<i className="fas fa-sign-out-alt mr-1"></i>
			</li>
		</ul>
	);
};

export default Footer;
