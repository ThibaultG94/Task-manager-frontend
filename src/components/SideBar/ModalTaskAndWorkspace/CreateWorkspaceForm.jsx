import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserContacts } from '../../../store/selectors/userSelectors';
import TitleInput from '../../ModalForm/TitleInput';
import ContactsSelect from '../../ModalForm/ContactsSelect';
import DescriptionTextarea from '../../ModalForm/DescriptionTextarea';
import SubmitButton from '../../ModalForm/SubmitButton';
import { useCreateWorkspace } from '../../../api/workspaces/useCreateWorkspace';
import { useSendInvitationWorkspace } from '../../../api/workspaceInvitations/useSendInvitationWorkspace';
import { toast } from 'react-toastify';
import LoadingCreateComponent from '../../Buttons/LoadingCreateComponent';

const CreateWorkspaceForm = ({ userId, setIsModalOpen, initialState, updateFormState }) => {
	const createWorkspace = useCreateWorkspace();
	const sendInvitationWorkspace = useSendInvitationWorkspace();
	const userContacts = useSelector(selectUserContacts);
	const [workspaceTitle, setWorkspaceTitle] = useState(initialState.workspaceTitle || '');
	const [workspaceDescription, setWorkspaceDescription] = useState(initialState.workspaceDescription || '');
	const [contacts, setContacts] = useState(initialState.contacts || []);
	const [selectedMembers, setSelectedMembers] = useState(initialState.selectedMembers || []);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (userContacts) setContacts(userContacts);
	}, [userContacts]);

	useEffect(() => {
		updateFormState({
			workspaceTitle,
			workspaceDescription,
			contacts,
			selectedMembers,
		});
	}, [workspaceTitle, workspaceDescription, contacts, selectedMembers]);

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

			await updateFormState({
				workspaceTitle: '',
				workspaceDescription: '',
				contacts: [],
				selectedMembers: [],
			});

			toast.success('Workspace créé !');
			setIsLoading(false);
			setIsModalOpen(false);
		} catch (err) {
			console.error('Error with CreateWorkspaceForm', err);
			toast.error('Une erreur est survenue');
			setIsLoading(false);
		}
	};

	return (
		<div id="tab-content2">
			<h2 className="font-light mb-2 sm:mb-4 mt-1 sm:mt-2 text-lg sm:text-xl md:text-2xl text-center">
				Nouveau Workspace
			</h2>
			<form
				className="w-5/6 mx-auto mb-9 flex flex-col"
				onSubmit={handleSubmit}>
				<div className="flex flex-col mb-2 sm:mb-4">
					<div className="flex flex-col mb-4">
						<TitleInput
							title={workspaceTitle}
							setTitle={setWorkspaceTitle}
							label={'Nom du Workspace'}
							length={40}
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
