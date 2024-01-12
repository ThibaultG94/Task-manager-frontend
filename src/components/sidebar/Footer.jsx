import React from 'react';
import { useLogoutUser } from '../../api/users/logoutUser';

const Footer = () => {
	const logoutUser = useLogoutUser();

	const handleLogout = async () => {
		await logoutUser();
	};

	return (
		<ul className="flex flex-row xl:flex-col justify-between self-center xl:self-end xl:w-full">
			<li
				className="cursor-default xl:mb-6 mr-6 xl:mr-0 text-xl"
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
