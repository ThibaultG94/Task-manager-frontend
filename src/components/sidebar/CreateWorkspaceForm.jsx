import React, { useEffect, useState } from 'react';
import { useCreateWorkspace } from '../../api/createWorkspace';
import { toast } from 'react-toastify';
import TitleInput from '../modal/TitleInput';
import DescriptionTextarea from '../modal/DescriptionTextarea';
import SubmitButton from '../modal/SubmitButton';
import { useDispatch } from 'react-redux';
import { setWorkspacesHasBeenUpdated } from '../../store/feature/editState.slice';
import { getAssignedUser } from '../../api/getAssignedUser';

const CreateWorkspaceForm = ({ userId, setIsModalOpen }) => {
	const dispatch = useDispatch();
	const createWorkspace = useCreateWorkspace();
	const [workspaceTitle, setWorkspaceTitle] = useState('');
	const [workspaceDescription, setWorkspaceDescription] = useState('');
	const [member, setMember] = useState('');

	useEffect(() => {
		const getUserInfos = async (userId) => {
			const assignedUser = await getAssignedUser(userId);
			setMember(assignedUser);
		};
		getUserInfos(userId);
	}, [userId]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const workspace = {
			title: workspaceTitle,
			userId,
			description: workspaceDescription,
			members: [
				{
					userId: member._id,
					username: member.username,
					email: member.email,
				},
			],
			isDefault: false,
		};

		try {
			await createWorkspace(workspace);
			dispatch(setWorkspacesHasBeenUpdated(true));
			toast.success('Workspace créé !');
			setIsModalOpen(false);
		} catch (err) {
			console.error('Error with CreateWorkspaceForm', err);
			toast.error('Une erreur est survenue');
		}
	};

	return (
		<div id="tab-content2">
			<h2 className="font-light mb-2 sm:mb-4 md:mb-6 mt-2 sm:mt-1 md:mt-0 text-lg sm:text-xl md:text-2xl text-center">
				Nouveau Workspace
			</h2>
			<form
				className="w-5/6 mx-auto mb-9 flex flex-col"
				onSubmit={handleSubmit}>
				<div className="flex flex-col md:flex-row mb-2 sm:mb-4 md:mb-5">
					<div className="flex flex-col md:w-1/2 sm:pr-1 md:pr-2">
						<TitleInput
							title={workspaceTitle}
							setTitle={setWorkspaceTitle}
							label={'Nom du Workspace'}
						/>
					</div>
					<DescriptionTextarea
						description={workspaceDescription}
						setDescription={setWorkspaceDescription}
						label={'Description du workspace'}
					/>
				</div>
				<SubmitButton label={'Créer le workspace'} />
			</form>
		</div>
	);
};

export default CreateWorkspaceForm;
