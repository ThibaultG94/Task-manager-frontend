import React from 'react';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
	return (
		<section className="bg-gray-100 flex items-center justify-center h-screen">
			<div className="text-center">
				<h1 className="text-4xl font-bold text-red-500">Erreur</h1>
				<p className="text-lg text-gray-700">
					Quelque chose s'est mal passé. Veuillez réessayer.
				</p>
				<NavLink to="/home" className="text-blue-500 underline">
					Retour à l'accueil
				</NavLink>
			</div>
		</section>
	);
};

export default ErrorPage;
