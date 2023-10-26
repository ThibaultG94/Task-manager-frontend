import React from 'react';

const SubmitButton = () => {
	return (
		<button
			type="submit"
			className="bg-[#3d395a] hover:bg-[#171f39] text-white py-2 px-4 rounded-lg text-lg transition-bg duration-300 mt-[10px] ml-auto w-full md:w-auto"
			id="buttonTask">
			Créer la tâche
		</button>
	);
};

export default SubmitButton;
