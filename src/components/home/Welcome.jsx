import React from 'react';

const Welcome = () => {
	return (
		<section
			id="right-side"
			className="relative flex flex-col items-center justify-center mb-20">
			<header className="bg-dark-blue px-7 w-[500px] rounded-t-lg text-white py-5">
				<h1 className="text-4xl mb-3 text-center">
					Application de Gestion de Tâches
				</h1>
				<p className="text-light-grey">
					Planifiez, organisez et suivez vos tâches comme jamais
					auparavant.
				</p>
			</header>
			<div className="max-w-[500px] bg-light-blue px-10 pt-6 pb-8 rounded-b-lg">
				<h2>Première fois ? Essayez avant de vous inscrire</h2>
				<p>
					Découvrez toute les fonctionnalités de l'application sans
					avoir besoin de créer un compte. Commencez à organisez vos
					tâches tout de suite en utilisant le mode visiteur.
				</p>
				<a href="#" className="button">
					Mode visiteur
				</a>
			</div>
		</section>
	);
};

export default Welcome;
