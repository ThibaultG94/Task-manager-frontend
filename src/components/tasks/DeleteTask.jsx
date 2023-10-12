import React from 'react';
import { useDispatch } from 'react-redux';

const DeleteTask = () => {
	const dispatch = useDispatch();

	return (
		<button className="delete-button">
			<i className="fas fa-trash-alt"></i> Supprimer
		</button>
	);
};

export default DeleteTask;
