import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { useGetUser } from '../../api/getUser';
import { useCreateTask } from '../../api/createTask';
import { useTasksHasBeenUpdated } from '../tasks/TasksHasBeenUpdated';
import TitleInput from '../modal/TitleInput';
import StatusSelect from '../modal/StatusSelect';
import PrioritySelect from '../modal/PrioritySelect';
import DeadlineInput from '../modal/DeadlineInput';
import DescriptionTextarea from '../modal/DescriptionTextarea';

const CreateTaskForm = ({ userId, setIsModalOpen }) => {
	const getUser = useGetUser();
	const createTask = useCreateTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const userWorkspaces = useSelector(selectWorkspaces);
	const [taskStatus, setTaskStatus] = useState('Pending');
	const [taskPriority, setTaskPriority] = useState('Medium');
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
			status: taskStatus,
			priority: taskPriority,
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
		<div id="tab-content1">
			<h2 className="text-2xl mb-5 text-center font-light">
				Nouvelle Tâche
			</h2>
			<form
				id="task-form"
				className="w-5/6 mx-auto mb-5 flex flex-col"
				onSubmit={handleSubmit}>
				<div className="flex flex-row mb-5">
					<div className="flex flex-col w-1/2 pr-2">
						<TitleInput
							taskTitle={taskTitle}
							setTaskTitle={setTaskTitle}
						/>
						<div className="flex flex-row mb-5">
							<StatusSelect
								taskStatus={taskStatus}
								setTaskStatus={setTaskStatus}
							/>
							<PrioritySelect
								taskPriority={taskPriority}
								setTaskPriority={setTaskPriority}
							/>
						</div>
						<DeadlineInput
							taskDeadline={taskDeadline}
							setTaskDeadline={setTaskDeadline}
						/>
					</div>
					<DescriptionTextarea
						taskDescription={taskDescription}
						setTaskDescription={setTaskDescription}
					/>
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
					className="bg-[#3d395a] hover:bg-[#171f39] text-white py-2 px-4 rounded-lg text-lg transition-bg duration-300 mt-[10px] ml-auto w-full md:w-auto"
					id="buttonTask">
					Créer la tâche
				</button>
				<span id="message-after-creating">{message}</span>
			</form>
		</div>
	);
};

export default CreateTaskForm;
