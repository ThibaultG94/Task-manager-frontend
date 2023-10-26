import React, { useState } from 'react';
import { useCreateWorkspace } from '../../api/createWorkspace';

const CreateWorkspaceForm = ({ userId, setIsModalOpen }) => {
	const createWorkspace = useCreateWorkspace();
	const [message, setMessage] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const workspace = {
			title: document.getElementById('title').value,
			userId,
			description: document.getElementById('workspaceDescription').value,
			members: [userId],
			isDefault: false,
		};

		try {
			await createWorkspace(workspace);
			document.getElementById('workspace-form').reset();
			setMessage('Workspace créé !');
			setTimeout(() => setIsModalOpen(false), 500);
		} catch (err) {
			console.log(err);
			setMessage('Une erreur est survenue');
		}
	};

	return (
		<div id="tab-content2">
			<h2 className="text-xl mb-2.5 text-center">Nouveau Workspace</h2>
			<form id="workspace-form" onSubmit={handleSubmit}>
				<div className="input-container title-container">
					<label htmlFor="title">Nom du Workspace</label>
					<input type="text" name="title" id="title" />
				</div>
				<div className="input-container description-container">
					<label htmlFor="description">Description</label>
					<textarea
						name="description"
						id="workspaceDescription"
						cols="30"
						rows="5"></textarea>
				</div>
				<button
					type="submit"
					id="buttonWorkspace"
					className="button mt-[20px]">
					Créer
				</button>
			</form>

			<span id="message-after-creating">{message}</span>
		</div>
	);
};

export default CreateWorkspaceForm;
