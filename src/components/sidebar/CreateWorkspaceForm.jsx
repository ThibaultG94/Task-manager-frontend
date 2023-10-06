import React from 'react';

const CreateWorkspaceForm = () => {
	return (
		<div id="tab-content2" className="p-5 border-t border-[#5a385f]">
			<h2 className="text-xl mb-2.5 text-center">Nouveau Workspace</h2>
			<form id="workspace-form">
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
		</div>
	);
};

export default CreateWorkspaceForm;
