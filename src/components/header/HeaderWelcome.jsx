import React from 'react';

const HeaderWelcome = () => {
	return (
		<div className="absolute left-0 top-[10px]">
			<h2 className="mb-[5px] text-[1.3rem]">
				Bonjour<span id="username"> !</span>
			</h2>
			<p className="text-[1.1rem]">
				Voici votre programme pour aujourd'hui
			</p>
		</div>
	);
};

export default HeaderWelcome;
