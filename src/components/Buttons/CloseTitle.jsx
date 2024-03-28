import React from 'react';
import { useDispatch } from 'react-redux';
import { setEditingField } from '../../store/feature/editState.slice';

const CloseTitle = () => {
	const dispatch = useDispatch();

	return (
		<button
			className="absolute bottom-1 right-3 ml-1 lg:ml-0 bg-black text-white p-1 rounded-full hover:bg-gray-800 focus:outline-none"
			onClick={() => {
				dispatch(
					setEditingField({
						field: 'title',
						value: false,
					})
				);
			}}
			type="button">
			<svg
				className="w-4 h-4"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				viewBox="0 0 24 24"
				stroke="currentColor">
				<path d="M6 18L18 6M6 6l12 12"></path>
			</svg>
		</button>
	);
};

export default CloseTitle;
