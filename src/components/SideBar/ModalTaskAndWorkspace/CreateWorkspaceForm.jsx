import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserContacts } from '../../../store/selectors/userSelectors';
import TitleInput from '../../ModalForm/TitleInput';
import ContactsSelect from '../../ModalForm/ContactsSelect';
import DescriptionTextarea from '../../ModalForm/DescriptionTextarea';
import SubmitButton from '../../ModalForm/SubmitButton';
import { useCreateWorkspace } from '../../../api/workspaces/useCreateWorkspace';
import { useSendInvitationWorkspace } from '../../../api/workspaceInvitations/useSendInvitationWorkspace';
import { toast } from 'react-toastify';
import { setWorkspacesHasBeenUpdated } from '../../../store/feature/editState.slice';
import LoadingCreateComponent from '../../Buttons/LoadingCreateComponent';

const CreateWorkspaceForm = ({ userId, setIsModalOpen }) => {
	const dispatch = useDispatch();
	const createWorkspace = useCreateWorkspace();
	const sendInvitationWorkspace = useSendInvitationWorkspace();
	const userContacts = useSelector(selectUserContacts);
	const [workspaceTitle, setWorkspaceTitle] = useState('');
	const [workspaceDescription, setWorkspaceDescription] = useState('');
	const [contacts, setContacts] = useState([]);
	const [selectedMembers, setSelectedMembers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (userContacts) setContacts(userContacts);
	}, [userContacts]);

	const handleChange = (selectedOptions) => {
		setSelectedMembers(
			selectedOptions.map((option) => ({
				id: option.value,
				username: option.label,
			}))
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		const workspace = {
			title: workspaceTitle,
			userId,
			description: workspaceDescription,
			members: {
				userId: userId,
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
			setIsLoading(false);
			setIsModalOpen(false);
			dispatch(setWorkspacesHasBeenUpdated(true));
		} catch (err) {
			console.error('Error with CreateWorkspaceForm', err);
			toast.error('Une erreur est survenue');
		}
	};

	return (
		<div id="tab-content2">
			<h2 className="font-light mb-2 sm:mb-4 md:mb-6 mt-1 sm:mt-2 md:mt-4 xl:mt-6 text-lg sm:text-xl md:text-2xl text-center">
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
				{isLoading ? (
					<LoadingCreateComponent />
				) : (
					<SubmitButton label={'Créer le workspace'} />
				)}
			</form>
		</div>
	);
};

export default CreateWorkspaceForm;
