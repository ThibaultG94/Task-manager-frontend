import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { useGetUser } from '../../api/getUser';
import PrioritySelect from '../modal/PrioritySelect';
import DeadlineInput from '../modal/DeadlineInput';
import WorkspaceSelect from '../modal/WorkspaceSelect';
import MemberSelect from '../modal/MemberSelect';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import ArrowDown from '../modal/ArrowDown';

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
		<form
			className="max-w-lg mx-auto pl-4 rounded-lg"
			onSubmit={(e) => e.stopPropagation()}>
			<div className="text-center pt-4 px-4">
				<h5 className="text-gray-900 text-lg leading-tight font-medium mb-2">
					<input
						className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 focus:outline-none focus:shadow-outline leading-tight p-2 rounded shadow w-full"
						maxLength={50}
						name="title"
						onChange={(e) =>
							setTaskData((prev) => ({
								...prev,
								title: e.target.value,
							}))
						}
						required
						type="text"
						value={taskData.title}
					/>
				</h5>
			</div>

			<div className="mb-4 text-base text-gray-700 px-2">
				<div className="flex justify-between items-center">
					<span className="text-sm font-bold text-gray-500">
						Status
					</span>
					<div className="mb-2 md:mr-2 sm:mb-0 relative w-full sm:w-1/2">
						<select
							className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 cursor-pointer focus:outline-none focus:shadow-outline leading-tight pr-8 px-4 py-2 rounded shadow w-full"
							name="status"
							onChange={(e) =>
								setTaskData((prev) => ({
									...prev,
									status: e.target.value,
								}))
							}
							value={taskData.status}>
							<option value="default" disabled>
								Status
							</option>
							<option value="Pending">À faire</option>
							<option value="In Progress">En cours</option>
							<option value="Completed">Terminé</option>
							<option value="Archived">Archivé</option>
						</select>
						<ArrowDown />
					</div>
				</div>

				<div className="flex justify-between items-center py-1">
					<span className="text-sm font-bold text-gray-500">
						Assigné à
					</span>
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

				<div className="flex justify-between items-center py-1">
					<span className="text-sm font-bold text-gray-500">
						Deadline
					</span>
					<div className="md:mr-2">
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
				</div>

				<div className="flex justify-between items-center py-1 md:mr-2">
					<span className="text-sm font-bold text-gray-500">
						Priorité
					</span>
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

				<div className="flex justify-between items-center py-1">
					<span className="text-sm font-bold text-gray-500">
						Workspace
					</span>
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
				</div>
			</div>

			<div className="mt-4 px-2">
				<h5 className="text-sm font-bold text-gray-500 mb-2">
					Description
				</h5>
				<textarea
					className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 flex-grow focus:outline-none focus:shadow-outline leading-tight p-2 resize-none rounded shadow w-full"
					cols="30"
					name="description"
					onChange={(e) =>
						setTaskData((prev) => ({
							...prev,
							description: e.target.value,
						}))
					}
					rows="5"
					value={taskData.description}
				/>
			</div>
		</form>
	);
};

export default ModalEditTask;
