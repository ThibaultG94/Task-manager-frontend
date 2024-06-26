import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	resetEditState,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { useEditWorkspace } from '../../api/workspaces/useEditWorkspace';
import { toast } from 'react-toastify';
import LoadingCreateComponent from '../Buttons/LoadingCreateComponent';

const SaveEditedWorkspace = ({
	selectedMembers,
	setIsEditingWorkspace,
	setIsModalWorkspaceOpen,
	userId,
	workspaceDataChange,
}) => {
	const dispatch = useDispatch();
	
	const editWorkspace = useEditWorkspace();

	const [editedWorkspace, setEditedWorkspace] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const membersArray = [
			{userId: userId, role: 'superadmin'},
			...selectedMembers.map((member) => ({
				userId: member.id,
				role: 'member',
			})),
		]

		setEditedWorkspace({
			_id: workspaceDataChange._id,
			title: workspaceDataChange.title,
			description: workspaceDataChange.description,
			members: membersArray,
			invitationStatus: workspaceDataChange.invitationStatus,
			isDefault: workspaceDataChange.isDefault,
		});
	}, [workspaceDataChange]);

	const updateWorkspace = async () => {
		try {
			await editWorkspace(editedWorkspace);
			dispatch(resetEditState());
			dispatch(setHasEdited(false));

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

		setIsLoading(true);
		await updateWorkspace();
		setIsLoading(false);
		setIsModalWorkspaceOpen(false);
		setIsEditingWorkspace(false);
	};

	return (
		<div>
			{isLoading ? (
				<LoadingCreateComponent />
			) : (
				<button
				className="button mt-2 bg-light-blue-2 hover:bg-dark-blue"
				onClick={handleSave}>
				<i className="fas fa-save mr-2"></i> Sauvegarder
			</button>
			)}
		</div>
	);
};

export default SaveEditedWorkspace;
