import React, { useEffect, useState } from 'react';
import { useCreateWorkspace } from '../../api/workspaces/createWorkspace';
import { toast } from 'react-toastify';
import TitleInput from '../ModalForm/TitleInput';
import DescriptionTextarea from '../ModalForm/DescriptionTextarea';
import SubmitButton from '../ModalForm/SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { setWorkspacesHasBeenUpdated } from '../../store/feature/editState.slice';
import { getAssignedUser } from '../../api/users/getAssignedUser';
import ContactsSelect from '../modal/ContactsSelect';
import { selectUserContacts } from '../../store/selectors/userSelectors';
import { useSendInvitationWorkspace } from '../../api/workspaceInvitations/sendInvitationWorkspace';

const CreateWorkspaceForm = ({ userId, setIsModalOpen }) => {
	const dispatch = useDispatch();
	const createWorkspace = useCreateWorkspace();
	const sendInvitationWorkspace = useSendInvitationWorkspace();
	const [workspaceTitle, setWorkspaceTitle] = useState('');
	const [workspaceDescription, setWorkspaceDescription] = useState('');
	const [member, setMember] = useState('');
	const userContacts = useSelector(selectUserContacts);
	const [contacts, setContacts] = useState([]);
	const [selectedMembers, setSelectedMembers] = useState([]);

	const handleChange = (selectedOptions) => {
		setSelectedMembers(
			selectedOptions.map((option) => ({
				id: option.value,
				username: option.label,
			}))
		);
	};

	useEffect(() => {
		const getUserInfos = async (userId) => {
			const assignedUser = await getAssignedUser(userId);
			setMember(assignedUser);
		};
		getUserInfos(userId);
	}, [userId]);

	useEffect(() => {
		if (userContacts) setContacts(userContacts);
	}, [userContacts]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const workspace = {
			title: workspaceTitle,
			userId,
			description: workspaceDescription,
			members: {
				userId: member._id,
				role: 'superadmin',
			},
			isDefault: false,
		};

		try {
			const newWorkspace = await createWorkspace(workspace);
			const membersArray = [
				...selectedMembers.map((member) => ({
					userId,
					contactId: member.id,
					role: 'member',
					workspaceId: newWorkspace._id,
				})),
			];

			await Promise.all(
				membersArray.map((member) => sendInvitationWorkspace(member))
			);

			toast.success('Workspace créé !');
			setIsModalOpen(false);
			dispatch(setWorkspacesHasBeenUpdated(true));
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
							length={30}
						/>
						{contacts && contacts.length > 0 && (
							<ContactsSelect
								contacts={contacts}
								handleChange={handleChange}
								selectedMembers={selectedMembers}
								workspace={false}
							/>
						)}
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
