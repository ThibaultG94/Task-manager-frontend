import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	resetEditState,
	setHasEdited,
	setWorkspacesHasBeenUpdated,
} from '../../store/feature/editState.slice';
import {
	deleteWorkspaceAction,
	deleteWorkspaceSuccess,
} from '../../store/feature/workspaces.slice';
import { deleteTaskFailed } from '../../store/feature/tasks.slice';
import { useDeleteWorkspace } from '../../api/workspaces/useDeleteWorkspace';
import { toast } from 'react-toastify';
import LoadingDeleteComponent from '../Buttons/LoadingDeleteComponent';

const DeleteWorkspace = ({ setIsModalWorkspaceOpen, workspaceData }) => {
	const dispatch = useDispatch();
	
	const deleteWorkspace = useDeleteWorkspace();

	const [isLoading, setIsLoading] = useState(false);

	const removeWorkspace = async () => {
		dispatch(deleteWorkspaceAction());
		try {
			setIsLoading(true);
			await deleteWorkspace(workspaceData._id);
			setIsLoading(false);

			dispatch(deleteWorkspaceSuccess(workspaceData._id));
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			dispatch(setWorkspacesHasBeenUpdated(true));
			toast.success('Le workspace a été supprimée avec succès !');
		} catch (error) {
			dispatch(deleteTaskFailed(error));
			toast.error('Échec de la suppression de la tâche.');
			return;
		}
	};

	const handleDelete = async () => {
		const confirmation = window.confirm(
			'Etes-vous sûr de vouloir supprimer ce workspace ?'
		);

		if (confirmation) {
			await removeWorkspace();
			setIsModalWorkspaceOpen(false);
		}
	};

	return (
				<div>
				{isLoading ? (
					<button
					className="absolute top-4 left-4">
						<LoadingDeleteComponent />
					</button>
				) : (
					<button
					className="hover:bg-red-error-2 text-base hover:text-red-error px-4 py-2 rounded-md absolute top-1 left-0"
					onClick={handleDelete}>
						<i className="fas fa-trash-alt"></i>
					</button>
				)}
			</div>
	);
};

export default DeleteWorkspace;
