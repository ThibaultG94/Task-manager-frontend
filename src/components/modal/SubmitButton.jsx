import React from 'react';

const SubmitButton = ({ label }) => {
	return (
		<button
			className="bg-dark-blue-2 hover:bg-dark-blue button duration-300 ml-auto mt-1 md:mt-4 transition-bg w-full md:w-auto"
			type="submit">
			{label}
		</button>
	);
};

export default SubmitButton;
