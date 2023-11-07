import React from 'react';

const Footer = () => {
	return (
		<ul className="self-end flex flex-col justify-between h-[11vh]">
			<li
				id="paramsLink"
				className="cursor-default text-xl"
				style={{ opacity: '0.3' }}>
				<i className="fas fa-cog mr-1"></i>
			</li>

			<li
				id="logoutLink"
				className="cursor-default text-xl"
				style={{ opacity: '0.3' }}>
				<i className="fas fa-sign-out-alt mr-1"></i>
			</li>
		</ul>
	);
};

export default Footer;
