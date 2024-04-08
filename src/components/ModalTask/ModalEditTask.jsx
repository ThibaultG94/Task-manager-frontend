import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import MemberSelect from '../ModalForm/MemberSelect';
import DeadlineInput from '../ModalForm/DeadlineInput';
import WorkspaceSelect from '../ModalForm/WorkspaceSelect';
import ArrowDown from '../Buttons/ArrowDown';
import { useGetWorkspace } from '../../api/workspaces/useGetWorkspace';
import getUserId from '../../api/users/getUserId';

const ModalEditTask = ({ taskData, setTaskData }) => {
	const userWorkspaces = useSelector(selectWorkspaces);
	const editedTask = useSelector(selectEditedTask);

	const getWorkspace = useGetWorkspace();

	const [workspaceMembers, setWorkspaceMembers] = useState('');
	const [selectedMember, setSelectedMember] = useState('default');

	const [isSuperAdmin, setIsSuperAdmin] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isTaskOwner, setIsTaskOwner] = useState(false);

	const [isEditTitle, setIsEditTitle] = useState(false);

	useEffect(() => {
		if (taskData.selectedWorkspace && userWorkspaces) {
			const workspace = userWorkspaces.find(
				(ws) => ws._id === taskData.selectedWorkspace
			);
			if (workspace) {
				setWorkspaceMembers(workspace.members);
			}
		}
	}, [taskData.selectedWorkspace]);

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
			selectedMember: editedTask?.assignedTo[0],
			assignedTo: editedTask?.assignedTo,
			category: editedTask?.category,
		}));
	}, [editedTask]);

	useEffect(() => {
		setSelectedMember(taskData.selectedMember.userId);
	}, [taskData]);

	useEffect(() => {
		const checkUserPrivileges = async () => {
		  if (taskData && taskData.selectedWorkspace && taskData.selectedWorkspace !== 'default') {
			  const workspace = await getWorkspace(taskData.selectedWorkspace);
			  const userId = await getUserId();
	  
			  const isSuperAdminVerification = workspace.members.some(
				(member) => member.userId === userId && member.role === 'superadmin'
			  );
			  const isAdminVerification = workspace.members.some(
				(member) => member.userId === userId && member.role === 'admin'
			  );
			  const isTaskOwner = taskData.userId === userId;
	  
			  setIsSuperAdmin(isSuperAdminVerification);
			  setIsAdmin(isAdminVerification);
			  setIsTaskOwner(isTaskOwner);
		  }
		};
	  
		checkUserPrivileges();
	  }, [taskData]);

	  useEffect(() => {
		if (isSuperAdmin || isAdmin || isTaskOwner) {
		  setIsEditTitle(true);
		}
	  }, [isSuperAdmin, isAdmin, isTaskOwner]);
	  

	return (
		<form
			className="max-w-lg mx-auto pl-2 pr-0 md:pl-4 md:pr-2 rounded-lg"
			onSubmit={(e) => e.stopPropagation()}>
			<div className="text-center pt-4 px-2 md:px-4">
				<h5 className="text-gray-900 text-base md:text-lg leading-tight font-medium mb-2">
					{isEditTitle ? (
					<input
						className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 focus:outline-none focus:shadow-outline leading-tight p-2 rounded shadow w-full"
						maxLength={60}
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
					) : (
					taskData.title
					)}
				</h5>
			</div>

			<div className="md:mb-4 text-base text-gray-700 px-2">
				<div className="flex justify-between items-center py-0 md:py-1">
					<span className="hidden md:block text-sm font-bold text-gray-500">
						Status
					</span>
					<div className="mb-1 md:mr-2 md:mb-0 relative w-full md:w-1/2">
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
					<span className="hidden md:block text-sm font-bold text-gray-500">
						Assigné à
					</span>
					<MemberSelect
						selectedMember={selectedMember}
						setSelectedMember={setSelectedMember}
						workspaceMembers={workspaceMembers}
					/>
				</div>

				<div className="flex justify-between items-center pt-1 md:py-1 w-full">
					<span className="hidden md:block text-sm font-bold text-gray-500">
						Deadline
					</span>
					<div className="md:mr-2 w-full md:w-1/2">
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

				<div className="flex justify-between items-center pt-0 pb-1 md:py-1">
					<span className="hidden md:block text-sm font-bold text-gray-500">
						Priorité
					</span>
					<div className="md:mr-2 relative w-full md:w-1/2">
						<select
							className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 cursor-pointer focus:outline-none focus:shadow-outline leading-tight pr-8 px-4 py-2 rounded shadow w-full"
							name="priority"
							onChange={(e) =>
								setTaskData((prev) => ({
									...prev,
									priority: e.target.value,
								}))
							}
							value={taskData.priority}>
							<option value="default" disabled>
								Priorité
							</option>
							<option value="Low">Faible</option>
							<option value="Medium">Moyenne</option>
							<option value="High">Haute</option>
							<option value="Urgent">Urgent</option>
						</select>
						<ArrowDown />
					</div>
				</div>

				<div className="flex justify-between items-center py-1">
					<span className="hidden md:block text-sm font-bold text-gray-500">
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

			<div className="md:mt-4 px-2">
				<textarea
					className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 flex-grow focus:outline-none focus:shadow-outline p-2 resize-none rounded shadow w-full"
					cols="30"
					name="description"
					placeholder="Description (optionnel)"
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
