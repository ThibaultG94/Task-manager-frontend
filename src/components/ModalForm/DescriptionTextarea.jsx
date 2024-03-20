import React from 'react';

const DescriptionTextarea = ({ description, setDescription, label }) => {
	return (
		<div className="flex flex-col flex-grow justify-between w-full md:w-1/2 pl-0 md:pl-2">
			<textarea
				className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 flex-grow focus:outline-none focus:shadow-outline leading-tight p-2 resize-none rounded shadow w-full"
				cols="30"
				name="description"
				onChange={(e) => setDescription(e.target.value)}
				placeholder={label}
				rows="5"
				value={description}></textarea>
		</div>
	);
};

export default DescriptionTextarea;
