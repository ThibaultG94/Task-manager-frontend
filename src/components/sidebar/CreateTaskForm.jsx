import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { useGetUser } from '../../api/getUser';
import { useCreateTask } from '../../api/createTask';
import { useTasksHasBeenUpdated } from '../tasks/TasksHasBeenUpdated';

const CreateTaskForm = ({ userId, setIsModalOpen }) => {
	const getUser = useGetUser();
	const createTask = useCreateTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const today = new Date();
	const formattedToday = `${today.getFullYear()}-${String(
		today.getMonth() + 1
	).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
	const userWorkspaces = useSelector(selectWorkspaces);
	const [status, setStatus] = useState('Pending');
	const [priority, setPriority] = useState('Medium');
	const [selectedWorkspace, setSelectedWorkspace] = useState('default');
	const [workspaceMembersIds, setWorkspaceMembersIds] = useState(null);
	const [workspaceMembers, setWorkspaceMembers] = useState(null);
	const [selectedMember, setSelectedMember] = useState('default');
	const [message, setMessage] = useState(null);
	const [taskTitle, setTaskTitle] = useState(null);
	const [taskDescription, setTaskDescription] = useState(null);
	const [taskDeadline, setTaskDeadline] = useState(null);

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

	const handleSubmit = async (e) => {
		e.preventDefault();

		const task = {
			title: taskTitle,
			userId,
			description: taskDescription,
			status,
			priority,
			workspaceId: selectedWorkspace,
			deadline: taskDeadline,
			assignedTo: selectedMember,
		};

		try {
			await createTask(task);
			await tasksHasBeenUpdated(task);
			setMessage('Tâche créée avec succès !');
			setTimeout(() => setIsModalOpen(false), 500);
		} catch (error) {
			setMessage('Échec de la création de la tâche.');
		}
	};

	return (
		<div id="tab-content1" className="p-5 border-t border-[#5a385f]">
			<h2 className="text-2xl mb-2.5 text-center font-light">
				Nouvelle Tâche
			</h2>
			<form
				id="task-form"
				className="w-4/5 mx-auto my-0 flex flex-col"
				onSubmit={handleSubmit}>
				<div className="flex flex-row mb-4">
					<div className="flex flex-col w-1/2 pr-2">
						<div className="mb-4">
							<input
								value={taskTitle}
								onChange={(e) => setTaskTitle(e.target.value)}
								type="text"
								name="taskTitle"
								placeholder="Nom de la tâche"
								required
								className="placeholder-gray-500 w-full p-2 border border-gray-300 rounded"
							/>
						</div>
						<div className="flex flex-row mb-4">
							<div className="relative w-1/2">
								<select
									name="status"
									value={status}
									className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
									onChange={(e) => setStatus(e.target.value)}>
									<option value="default" disabled>
										Status
									</option>
									<option value="Pending">À faire</option>
									<option value="In Progress">
										En cours
									</option>
									<option value="Completed">Terminé</option>
									<option value="Archived">Archivé</option>
								</select>
								<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
									<svg
										className="fill-current h-4 w-4"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20">
										<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
									</svg>
								</div>
							</div>

							<div className="relative w-1/2 pl-2">
								<select
									name="priority"
									value={priority}
									className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
									onChange={(e) =>
										setPriority(e.target.value)
									}>
									<option value="default" disabled>
										Priorité
									</option>
									<option value="Low">Faible</option>
									<option value="Medium">Moyenne</option>
									<option value="High">Haute</option>
									<option value="Urgent">Urgent</option>
								</select>
								<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
									<svg
										className="fill-current h-4 w-4"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20">
										<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
									</svg>
								</div>
							</div>
						</div>
						<div className="mb-4">
							<input
								value={taskDeadline}
								onChange={(e) =>
									setTaskDeadline(e.target.value)
								}
								type="date"
								name="deadline"
								placeholder="Date d'échéance"
								defaultValue={formattedToday}
								className="w-full p-2 border border-gray-300 rounded"
							/>
						</div>
					</div>
					<div className="w-1/2 pl-2 flex flex-col justify-between">
						<textarea
							value={taskDescription}
							onChange={(e) => setTaskDescription(e.target.value)}
							name="description"
							className="w-full p-2 border border-gray-300 rounded resize-none"
							placeholder="Description de la tâche"
							cols="30"
							rows="5"></textarea>
					</div>
				</div>
				<div className="flex flex-row mb-4">
					<div className="relative w-1/2 mr-2">
						<select
							name="workspaceId"
							value={selectedWorkspace}
							className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
							onChange={(e) =>
								setSelectedWorkspace(e.target.value)
							}>
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
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
							<svg
								className="fill-current h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20">
								<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
							</svg>
						</div>
					</div>

					<div className="relative w-1/2 pl-2">
						<select
							name="assignedTo"
							id="assignedTo"
							value={selectedMember}
							className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
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
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
							<svg
								className="fill-current h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20">
								<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
							</svg>
						</div>
					</div>
				</div>
				<button
					type="submit"
					className="button mt-[10px]"
					id="buttonTask">
					Créer
				</button>
			</form>

			<span id="message-after-creating">{message}</span>
		</div>
	);
};

export default CreateTaskForm;
