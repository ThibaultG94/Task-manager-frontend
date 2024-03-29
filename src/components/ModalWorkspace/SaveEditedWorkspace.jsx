import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	resetEditState,
	setHasEdited,
	setWorkspacesHasBeenUpdated,
} from '../../store/feature/editState.slice';
import { useEditWorkspace } from '../../api/workspaces/useEditWorkspace';
import { useSendInvitationWorkspace } from '../../api/workspaceInvitations/useSendInvitationWorkspace';
import { getAssignedUser } from '../../api/users/getAssignedUser';
import { toast } from 'react-toastify';

const SaveEditedWorkspace = ({
	selectedMembers,
	setIsEditingWorkspace,
	setIsModalWorkspaceOpen,
	userId,
	workspaceDataChange,
}) => {
	const dispatch = useDispatch();
	
	const editWorkspace = useEditWorkspace();
	const sendInvitationWorkspace = useSendInvitationWorkspace();

	const [editedWorkspace, setEditedWorkspace] = useState(null);
	const [member, setMember] = useState('');

	useEffect(() => {
		const getUserInfos = async (userId) => {
			const assignedUser = await getAssignedUser(userId);
			setMember(assignedUser);
		};
		getUserInfos(userId);
	}, [userId]);

	useEffect(() => {
		const membersArray = [
			...workspaceDataChange.members.map((member) => ({
				userId: member.userId,
				role: member.role ? member.role : 'member',
			})),
		];

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
			dispatch(setWorkspacesHasBeenUpdated(true));
			const membersArray = [
				...selectedMembers.map((member) => ({
					userId,
					contactId: member.id,
					role: 'member',
					workspaceId: editedWorkspace._id,
				})),
			];
			membersArray.forEach(async (member) => {
				await sendInvitationWorkspace(member);
			});
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
