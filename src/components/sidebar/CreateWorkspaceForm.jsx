import React, { useState } from 'react';
import { useCreateWorkspace } from '../../api/createWorkspace';
import { toast } from 'react-toastify';
import TitleInput from '../modal/TitleInput';
import DescriptionTextarea from '../modal/DescriptionTextarea';
import SubmitButton from '../modal/SubmitButton';

const CreateWorkspaceForm = ({ userId, setIsModalOpen }) => {
	const createWorkspace = useCreateWorkspace();
	const [workspaceTitle, setWorkspaceTitle] = useState('');
	const [workspaceDescription, setWorkspaceDescription] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const workspace = {
			title: workspaceTitle,
			userId,
			description: document.getElementById('workspaceDescription').value,
			members: [userId],
			isDefault: false,
		};

		try {
			await createWorkspace(workspace);
			document.getElementById('workspace-form').reset();
			toast.success('Workspace créé !');
			setTimeout(() => setIsModalOpen(false), 500);
		} catch (err) {
			console.log(err);
			toast.error('Une erreur est survenue');
		}
	};

	return (
		<div id="tab-content2">
			<h2 className="text-2xl mb-8 text-center font-light">
				Nouveau Workspace
			</h2>
			<form
				id="workspace-form"
				onSubmit={handleSubmit}
				className="w-5/6 mx-auto mb-9 flex flex-col">
				<div className="flex flex-row mb-5">
					<div className="flex flex-col w-1/2 pr-2">
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
