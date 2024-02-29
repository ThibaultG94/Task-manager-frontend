import React from 'react';
import { NavLink } from 'react-router-dom';

const ErrorPage404 = () => {
	return (
		<section className="bg-gray-100 flex items-center justify-center h-screen">
			<div className="text-center">
				<h1 className="text-4xl font-bold text-red-500">Erreur 404</h1>
				<p className="text-lg text-gray-700">
					La page que vous cherchez n'existe pas.
				</p>
				<NavLink to="/home" className="text-blue-500 underline">
					Retour à l'accueil
				</NavLink>
			</div>
		</section>
	);
};

export default ErrorPage404;
