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
import WorkspaceSelect from '../modal/WorkspaceSelect';
import MemberSelect from '../modal/MemberSelect';
import SubmitButton from '../modal/SubmitButton';

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
					<WorkspaceSelect
						selectedWorkspace={selectedWorkspace}
						setSelectedWorkspace={setSelectedWorkspace}
						userWorkspaces={userWorkspaces}
					/>
					<MemberSelect
						selectedMember={selectedMember}
						setSelectedMember={setSelectedMember}
						workspaceMembers={workspaceMembers}
					/>
				</div>
				<SubmitButton />
				<span id="message-after-creating">{message}</span>
			</form>
		</div>
	);
};

export default CreateTaskForm;
