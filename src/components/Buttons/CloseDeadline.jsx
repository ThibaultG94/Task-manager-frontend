import React from 'react';
import { useDispatch } from 'react-redux';
import { setEditingField } from '../../store/feature/editState.slice';

const CloseDeadline = () => {
	const dispatch = useDispatch();

	return (
		<button
			onClick={() => {
				dispatch(
					setEditingField({
						field: 'deadline',
						value: false,
					})
				);
			}}
			className="absolute bottom-0 left-28 ml-1 lg:ml-0 bg-black text-white p-1 rounded-full hover:bg-gray-800 focus:outline-none">
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

export default CloseDeadline;
