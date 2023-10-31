import React from 'react';

const SubmitButton = ({ label }) => {
	return (
		<button
			type="submit"
			className="button bg-[#3d395a] hover:bg-[#171f39] transition-bg duration-300 mt-[20px] ml-auto w-full md:w-auto"
			id="buttonTask">
			{label}
		</button>
	);
};

export default SubmitButton;
