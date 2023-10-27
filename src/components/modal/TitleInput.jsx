import React from 'react';

const TitleInput = ({ title, setTitle, label }) => {
	return (
		<div className="mb-5">
			<input
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				type="text"
				name="title"
				placeholder={label}
				required
				className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 p-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
			/>
		</div>
	);
};

export default TitleInput;
