import React, { useEffect, useState } from 'react';
import { useCreateTask } from '../../api/tasks/useCreateTask';

import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { useTasksHasBeenUpdated } from '../tasks/TasksHasBeenUpdated';
import TitleInput from '../modal/TitleInput';
import StatusSelect from '../modal/StatusSelect';
import PrioritySelect from '../modal/PrioritySelect';
import DeadlineInput from '../modal/DeadlineInput';
import DescriptionTextarea from '../modal/DescriptionTextarea';
import WorkspaceSelect from '../modal/WorkspaceSelect';
import MemberSelect from '../modal/MemberSelect';
import SubmitButton from '../modal/SubmitButton';
import { toast } from 'react-toastify';

const CreateTaskForm = ({ userId, setIsModalOpen }) => {
	const createTask = useCreateTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const userWorkspaces = useSelector(selectWorkspaces);
	const [taskTitle, setTaskTitle] = useState('');
	const [taskStatus, setTaskStatus] = useState('Pending');
	const [taskPriority, setTaskPriority] = useState('Medium');
	const [taskDeadline, setTaskDeadline] = useState('');
	const [taskDescription, setTaskDescription] = useState('');
	const [selectedWorkspace, setSelectedWorkspace] = useState('default');
	const [workspaceMembers, setWorkspaceMembers] = useState('');
	const [selectedMember, setSelectedMember] = useState('default');

	useEffect(() => {
		if (selectedWorkspace && userWorkspaces) {
			const workspace = userWorkspaces.find(
				(ws) => ws._id === selectedWorkspace
			);
			if (workspace) {
				setWorkspaceMembers(workspace.members);
			}
		}
	}, [selectedWorkspace]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (selectedWorkspace === 'default') {
			toast.error('Veuillez sélectionner un workspace.');
			return;
		}

		const assignedUser = workspaceMembers.find(
			(member) => member.userId === selectedMember
		);

		const task = {
			title: taskTitle,
			userId,
			description: taskDescription,
			status: taskStatus,
			priority: taskPriority,
			workspaceId: selectedWorkspace,
			deadline: taskDeadline,
			assignedTo: assignedUser,
		};

		try {
			await createTask(task);
			await tasksHasBeenUpdated(task);
			toast.success('Tâche créée avec succès !');
			setIsModalOpen(false);
		} catch (error) {
			toast.error('Échec de la création de la tâche.');
		}
	};

	return (
		<div id="tab-content1">
			<h2 className="font-light mb-2 sm:mb-4 md:mb-6 text-lg sm:text-xl md:text-2xl text-center">
				Nouvelle Tâche
			</h2>
			<form
				className="w-5/6 mx-auto mb-9 flex flex-col"
				onSubmit={handleSubmit}>
				<div className="flex flex-col md:flex-row mb-2 sm:mb-4 md:mb-5">
					<div className="flex flex-col md:w-1/2 sm:pr-1 md:pr-2">
						<TitleInput
							title={taskTitle}
							setTitle={setTaskTitle}
							label={'Nom de la tâche'}
							length={60}
						/>
						<div className="flex flex-col sm:flex-row mb-2 sm:mb-4 md:mb-5">
							<StatusSelect
								taskStatus={taskStatus}
								setTaskStatus={setTaskStatus}
							/>
							<PrioritySelect
								taskPriority={taskPriority}
								setTaskPriority={setTaskPriority}
							/>
						</div>
						<DeadlineInput setTaskDeadline={setTaskDeadline} />
					</div>
					<DescriptionTextarea
						description={taskDescription}
						setDescription={setTaskDescription}
						label={'Description de la tâche'}
					/>
				</div>
				<div className="flex flex-col md:flex-row mb-2">
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
				<SubmitButton label={'Créer la tâche'} />
			</form>
		</div>
	);
};

export default CreateTaskForm;
