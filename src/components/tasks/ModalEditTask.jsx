import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { useGetUser } from '../../api/getUser';
import TitleInput from '../modal/TitleInput';
import StatusSelect from '../modal/StatusSelect';
import PrioritySelect from '../modal/PrioritySelect';
import DeadlineInput from '../modal/DeadlineInput';
import DescriptionTextarea from '../modal/DescriptionTextarea';
import WorkspaceSelect from '../modal/WorkspaceSelect';
import MemberSelect from '../modal/MemberSelect';
import { selectEditedTask } from '../../store/selectors/taskSelectors';

const ModalEditTask = ({ taskData, setTaskData }) => {
	const getUser = useGetUser();
	const userWorkspaces = useSelector(selectWorkspaces);
	const editedTask = useSelector(selectEditedTask);

	useEffect(() => {
		if (taskData.selectedWorkspace && userWorkspaces) {
			const workspace = userWorkspaces.find(
				(ws) => ws._id === taskData.selectedWorkspace
			);
			if (workspace) {
				setTaskData((prev) => ({
					...prev,
					workspaceMembersIds: workspace.members,
				}));
			}
		}
	}, [taskData.selectedWorkspace]);

	useEffect(() => {
		const getMembers = async () => {
			const memberPromises = taskData.workspaceMembersIds.map((id) =>
				getUser(id)
			);
			const members = await Promise.all(memberPromises);
			setTaskData((prev) => ({ ...prev, workspaceMembers: members }));
		};

		taskData.workspaceMembersIds.length && getMembers();
	}, [taskData.workspaceMembersIds]);

	useEffect(() => {
		setTaskData((prevState) => ({
			...prevState,
			_id: editedTask?._id,
			title: editedTask?.title,
			status: editedTask?.status,
			priority: editedTask?.priority,
			deadline: editedTask?.deadline,
			description: editedTask?.description,
			selectedWorkspace: editedTask?.workspaceId,
			selectedMember: editedTask?.assignedTo,
			category: editedTask?.category,
		}));
	}, [editedTask]);

	return (
		<div className="mt-6">
			<form
				className="w-full mx-auto flex flex-col"
				onSubmit={(e) => e.stopPropagation()}>
				<div className="flex flex-row">
					<div className="flex flex-col w-1/2 pr-2">
						<TitleInput
							title={taskData.title}
							setTitle={(value) =>
								setTaskData((prev) => ({
									...prev,
									title: value,
								}))
							}
							label={'Nom de la tâche'}
						/>
						<div className="flex flex-row mb-5">
							<StatusSelect
								taskStatus={taskData.status}
								setTaskStatus={(value) =>
									setTaskData((prev) => ({
										...prev,
										status: value,
									}))
								}
							/>
							<PrioritySelect
								taskPriority={taskData.priority}
								setTaskPriority={(value) =>
									setTaskData((prev) => ({
										...prev,
										priority: value,
									}))
								}
							/>
						</div>
						<DeadlineInput
							taskDeadline={taskData.deadline}
							setTaskDeadline={(value) =>
								setTaskData((prev) => ({
									...prev,
									deadline: value,
								}))
							}
						/>
					</div>
					<DescriptionTextarea
						description={taskData.description}
						setDescription={(value) =>
							setTaskData((prev) => ({
								...prev,
								description: value,
							}))
						}
						label={'Description de la tâche'}
					/>
				</div>
				<div className="flex flex-row mt-4">
					<WorkspaceSelect
						selectedWorkspace={taskData.selectedWorkspace}
						setSelectedWorkspace={(value) =>
							setTaskData((prev) => ({
								...prev,
								selectedWorkspace: value,
							}))
						}
						userWorkspaces={userWorkspaces}
					/>
					<MemberSelect
						selectedMember={taskData.selectedMember}
						setSelectedMember={(value) =>
							setTaskData((prev) => ({
								...prev,
								selectedMember: value,
							}))
						}
						workspaceMembers={taskData.workspaceMembers}
					/>
				</div>
			</form>
		</div>
	);
};

export default ModalEditTask;
