import React from 'react';

const SubmitButton = ({ label }) => {
	return (
		<button
			className="bg-light-blue-2 hover:bg-dark-blue-2 button duration-300 ml-auto mt-1 md:mt-4 transition-bg w-full"
			type="submit">
			{label}
		</button>
	);
};

export default SubmitButton;
