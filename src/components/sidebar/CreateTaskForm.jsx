import React from 'react';

const CreateTaskForm = () => {
	return (
		<div id="tab-content1" className="p-5 border-t border-[#5a385f]">
			<h2 className="text-xl mb-2.5 text-center">Nouvelle Tâche</h2>
			<form id="task-form">
				<div className="input-container title-container">
					<label htmlFor="taskTitle">Nom de la tâche</label>
					<input
						type="text"
						name="taskTitle"
						id="taskTitle"
						required
					/>
				</div>

				<div className="input-container description-container">
					<label htmlFor="description">Description</label>
					<textarea
						name="description"
						id="description"
						cols="30"
						rows="5"></textarea>
				</div>

				<div className="input-container status-container">
					<label htmlFor="status">Status</label>
					<select name="status" id="status">
						<option value="Pending" selected>
							À faire
						</option>
						<option value="In Progress">En cours</option>
						<option value="Completed">Terminé</option>
						<option value="Archived">Archivé</option>
					</select>
				</div>

				<div className="input-container priority-container">
					<label htmlFor="priority">Priorité</label>
					<select name="priority" id="priority">
						<option value="Low">Faible</option>
						<option value="Medium" selected>
							Moyenne
						</option>
						<option value="High">Haute</option>
						<option value="Urgent">Urgent</option>
					</select>
				</div>

				<div className="input-container workspaceId-container">
					<label htmlFor="workspaceId">Workspace</label>
					<select name="workspaceId" id="workspaceId">
						<option value="" selected disabled>
							Sélectionnez un workspace
						</option>
					</select>
				</div>

				<div className="input-container assignedTo-container">
					<label htmlFor="assignedTo">Assigné à</label>
					<select name="assignedTo" id="assignedTo"></select>
				</div>

				<div className="input-container deadline-container">
					<label htmlFor="deadline">Échéance</label>
					<input type="date" name="deadline" id="deadline" />
				</div>

				<button
					type="submit"
					className="button mt-[20px]"
					id="buttonTask">
					Créer
				</button>
			</form>

			<span id="message-after-creating"></span>
		</div>
	);
};

export default CreateTaskForm;
