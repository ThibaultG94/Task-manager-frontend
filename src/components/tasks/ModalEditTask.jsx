import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { useGetUser } from '../../api/getUser';
import { useTasksHasBeenUpdated } from '../tasks/TasksHasBeenUpdated';
import TitleInput from '../modal/TitleInput';
import StatusSelect from '../modal/StatusSelect';
import PrioritySelect from '../modal/PrioritySelect';
import DeadlineInput from '../modal/DeadlineInput';
import DescriptionTextarea from '../modal/DescriptionTextarea';
import WorkspaceSelect from '../modal/WorkspaceSelect';
import MemberSelect from '../modal/MemberSelect';
import { toast } from 'react-toastify';
import CloseButton from '../modal/CloseButton';

const ModalEditTask = ({
	closeModal,
	setIsModalOpen,
	setIsEditing,
	userId,
}) => {
	const getUser = useGetUser();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const userWorkspaces = useSelector(selectWorkspaces);
	const [taskTitle, setTaskTitle] = useState('');
	const [taskStatus, setTaskStatus] = useState('Pending');
	const [taskPriority, setTaskPriority] = useState('Medium');
	const [taskDeadline, setTaskDeadline] = useState('');
	const [taskDescription, setTaskDescription] = useState('');
	const [selectedWorkspace, setSelectedWorkspace] = useState('default');
	const [workspaceMembersIds, setWorkspaceMembersIds] = useState('');
	const [workspaceMembers, setWorkspaceMembers] = useState('');
	const [selectedMember, setSelectedMember] = useState('default');
	const modalRef = useRef(null);

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
		<section
			className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-10"
			onClick={closeModal}>
			<div
				className="absolute z-10 top-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-12 px-5 rounded-md w-[52vw]"
				ref={modalRef}
				onClick={(e) => e.stopPropagation()}>
				<CloseButton onClose={closeModal} modalTabs={false} />
				<div>
					<form
						className="w-5/6 mx-auto flex flex-col"
						onSubmit={(e) => e.stopPropagation()}>
						<div className="flex flex-row">
							<div className="flex flex-col w-1/2 pr-2">
								<TitleInput
									title={taskTitle}
									setTitle={setTaskTitle}
									label={'Nom de la tâche'}
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
									setTaskDeadline={setTaskDeadline}
								/>
							</div>
							<DescriptionTextarea
								description={taskDescription}
								setDescription={setTaskDescription}
								label={'Description de la tâche'}
							/>
						</div>
						<div className="flex flex-row mt-4">
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
					</form>
				</div>
			</div>
		</section>
	);
};

export default ModalEditTask;
