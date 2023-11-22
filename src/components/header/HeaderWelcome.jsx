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
		<div className="absolute left-0">
			<h2 className="hidden sm:block md:mb-0.5 text-base sm:text-lg md:text-xl">
				Bonjour {currentUser?.username} !
			</h2>
			<p className="hidden md:block text-base">{message && message}</p>
		</div>
	);
};

export default HeaderWelcome;
