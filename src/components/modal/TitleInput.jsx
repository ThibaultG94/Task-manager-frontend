import React from 'react';

const TitleInput = ({ title, setTitle, label }) => {
	return (
		<div className="mb-2 sm:mb-4 md:mb-5">
			<input
				className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 focus:outline-none focus:shadow-outline leading-tight p-2 rounded shadow w-full"
				maxLength={50}
				name="title"
				onChange={(e) => setTitle(e.target.value)}
				placeholder={label}
				required
				type="text"
				value={title}
			/>
		</div>
	);
};

export default TitleInput;
