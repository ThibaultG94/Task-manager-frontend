import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const HeaderWelcome = ({ currentUser }) => {
	const [message, setMessage] = useState();
	const location = useLocation();

	useEffect(() => {
		switch (location.pathname) {
			case '/pages/dashboard':
				setMessage("Voici votre programme pour aujourd'hui");
				break;
			case '/pages/tasks':
				setMessage('Gérez vos tâches efficacement');
				break;
			case '/pages/workspaces':
				setMessage('Explorez vos espaces de travail');
				break;
			default:
				setMessage('');
				break;
		}
	}, [location]);

	return (
		<div className="absolute left-0 top-[10px]">
			<h2 className="mb-[5px] text-[1.3rem]">
				Bonjour {currentUser?.username} !
			</h2>
			<p className="text-[1.1rem]">{message && message}</p>
		</div>
	);
};

export default HeaderWelcome;
