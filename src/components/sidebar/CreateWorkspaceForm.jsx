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
			setIsModalOpen(false);
		} catch (err) {
			console.log(err);
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
