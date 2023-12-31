import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	resetEditState,
	setHasEdited,
	setWorkspacesHasBeenUpdated,
} from '../../store/feature/editState.slice';
import { toast } from 'react-toastify';
import { useEditWorkspace } from '../../api/editWorkspace';

const SaveEditedWorkspace = ({
	setIsEditingWorkspace,
	setIsModalWorkspaceOpen,
	workspaceData,
}) => {
	const dispatch = useDispatch();
	const editWorkspace = useEditWorkspace();
	const [editedWorkspace, setEditedWorkspace] = useState(null);

	useEffect(() => {
		setEditedWorkspace({
			_id: workspaceData._id,
			title: workspaceData.title,
			description: workspaceData.description,
			members: workspaceData.members,
		});
	}, [workspaceData]);

	const updateWorkspace = async () => {
		try {
			await editWorkspace(editedWorkspace);
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			dispatch(setWorkspacesHasBeenUpdated(true));
			toast.success('Le workspace a été mise à jour avec succès !');
		} catch (error) {
			toast.error('Échec de la mise à jour du workspace.');
			return;
		}
	};

	const handleSave = async () => {
		if (editedWorkspace.title === '') {
			toast.error('Veuillez saisir un titre.');
			return;
		}
		await updateWorkspace();
		setIsModalWorkspaceOpen(false);
		setIsEditingWorkspace(false);
	};

	return (
		<button
			className="button mt-2 bg-light-blue-2 hover:bg-dark-blue"
			onClick={handleSave}>
			<i className="fas fa-save mr-2"></i> Sauvegarder
		</button>
	);
};

export default SaveEditedWorkspace;
