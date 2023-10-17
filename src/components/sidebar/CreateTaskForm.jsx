import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { useGetUser } from '../../api/getUser';

const CreateTaskForm = () => {
	const getUser = useGetUser();
	const userWorkspaces = useSelector(selectWorkspaces);
	const [status, setStatus] = useState('Pending');
	const [priority, setPriority] = useState('Medium');
	const [selectedWorkspace, setSelectedWorkspace] = useState('default');
	const [workspaceMembersIds, setWorkspaceMembersIds] = useState(null);
	const [workspaceMembers, setWorkspaceMembers] = useState(null);
	const [selectedMember, setSelectedMember] = useState('default');

	useEffect(() => {
		if (selectedWorkspace && userWorkspaces) {
			const workspace = userWorkspaces.find(
				(ws) => ws._id === selectedWorkspace
			);
			if (workspace) {
				setWorkspaceMembersIds(workspace.members);
			}
		}
	}, [selectedWorkspace]);

	useEffect(() => {
		const getMembers = async () => {
			const memberPromises = workspaceMembersIds.map((id) => getUser(id));
			const members = await Promise.all(memberPromises);
			setWorkspaceMembers(members);
		};

		workspaceMembersIds && getMembers();
	}, [workspaceMembersIds]);

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
					<select
						name="status"
						id="status"
						value={status}
						onChange={(e) => setStatus(e.target.value)}>
						<option value="Pending">À faire</option>
						<option value="In Progress">En cours</option>
						<option value="Completed">Terminé</option>
						<option value="Archived">Archivé</option>
					</select>
				</div>

				<div className="input-container priority-container">
					<label htmlFor="priority">Priorité</label>
					<select
						name="priority"
						id="priority"
						value={priority}
						onChange={(e) => setPriority(e.target.value)}>
						<option value="Low">Faible</option>
						<option value="Medium">Moyenne</option>
						<option value="High">Haute</option>
						<option value="Urgent">Urgent</option>
					</select>
				</div>

				<div className="input-container workspaceId-container">
					<label htmlFor="workspaceId">Workspace</label>
					<select
						name="workspaceId"
						id="workspaceId"
						value={selectedWorkspace}
						onChange={(e) => setSelectedWorkspace(e.target.value)}>
						<option value="default" disabled>
							Sélectionnez un workspace
						</option>
						{userWorkspaces &&
							userWorkspaces.map((workspace) => (
								<option
									key={workspace._id}
									value={workspace._id}>
									{workspace.title}
								</option>
							))}
					</select>
				</div>

				<div className="input-container assignedTo-container">
					<label htmlFor="assignedTo">Assigné à</label>
					<select
						name="assignedTo"
						id="assignedTo"
						value={selectedMember}
						onChange={(e) => setSelectedMember(e.target.value)}>
						<option value="default" disabled>
							Sélectionnez l'utilisateur en charge de la tâche
						</option>
						{workspaceMembers &&
							workspaceMembers.map((member) => (
								<option key={member._id} value={member._id}>
									{member.username}
								</option>
							))}
					</select>
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
