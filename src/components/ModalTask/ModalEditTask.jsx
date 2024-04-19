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
import { frenchFormattedDate } from '../../utils/dateFormatTools';

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
	const [isEditStatus, setIsEditStatus] = useState(false);
	const [isEditAssignedTo, setIsEditAssignedTo] = useState(false);
	const [isEditDeadline, setIsEditDeadline] = useState(false);
	const [isEditPriority, setIsEditPriority] = useState(false);
	const [isEditWorkspace, setIsEditWorkspace] = useState(false);
	const [isEditDescription, setIsEditDescription] = useState(false);

	const [convertedMember, setConvertedMember] = useState('');
	const [convertedDeadline, setConvertedDeadline] = useState('');
	const [convertedWorkspace, setConvertedWorkspace] = useState('');

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
		if (selectedMember !== 'default' && workspaceMembers.length > 0) {
			let memberAssigned = "";
			const member = workspaceMembers?.filter((member) => member.userId === selectedMember);
			memberAssigned = member;
			setTaskData((prevState) => ({
				...prevState,
				assignedTo: memberAssigned,
			}));
		}
	}, [selectedMember]);

	useEffect(() => {
		setTaskData((prevState) => ({
			...prevState,
			_id: editedTask?._id,
			userId: editedTask?.userId,
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
			  const isTaskOwner = editedTask.userId == userId;
	  
			  setIsSuperAdmin(isSuperAdminVerification);
			  setIsAdmin(isAdminVerification);
			  setIsTaskOwner(isTaskOwner);
		  }
		};

		const fetchConvertedMember = async () => {
			setConvertedMember(taskData?.assignedTo[0]?.username);
		};

		const fetchConvertedDeadline = async () => {
			const deadline = await frenchFormattedDate(taskData?.deadline);
			setConvertedDeadline(deadline);
		};

		const fetchConvertedWorkspace = async () => {
			const workspace = await getWorkspace(editedTask?.workspaceId);
			setConvertedWorkspace(workspace?.title);
		};
	  
		checkUserPrivileges();
		fetchConvertedMember();
		fetchConvertedDeadline();
		if (taskData && taskData.selectedWorkspace) fetchConvertedWorkspace();
		setSelectedMember(taskData?.assignedTo[0]?.userId);
	  }, [taskData]);

	  useEffect(() => {
		if (isSuperAdmin || isAdmin || isTaskOwner) {
		  setIsEditTitle(true);
		  setIsEditStatus(true);
		  setIsEditAssignedTo(true);
		  setIsEditDeadline(true);
		  setIsEditPriority(true);
		  setIsEditWorkspace(true);
		  setIsEditDescription(true);
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
						{isEditStatus ? (
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
							) : (
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
							</select>
						)}
						<ArrowDown />
					</div>
				</div>

				<div className="flex justify-between items-center py-1">
					<span className="hidden md:block text-sm font-bold text-gray-500">
						Assigné à
					</span>
					{isEditAssignedTo ? (
						<MemberSelect
						selectedMember={selectedMember}
						setSelectedMember={setSelectedMember}
						workspaceMembers={workspaceMembers}
						/>
					) : (
						<div className="assigned-icon px-2 py-1 mr-2 rounded-lg bg-light-blue-3">
							<span className="ml-2 text-sm">{convertedMember} </span>
						</div>
					)}
				</div>

				<div className="flex justify-between items-center pt-1 md:py-1 w-full">
					<span className="hidden md:block text-sm font-bold text-gray-500">
						Deadline
					</span>
					{isEditDeadline ? (
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
					) : (
						<div className={'deadline-icon ml-2 px-2 py-1 rounded-lg ' + taskData?.category}>
							<span className="ml-2 text-sm">
								{convertedDeadline}
							</span>
						</div>
					)}
				</div>

				<div className="flex justify-between items-center pt-0 pb-1 md:py-1">
					<span className="hidden md:block text-sm font-bold text-gray-500">
						Priorité
					</span>
					{isEditPriority ? (
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
					) : (
						<div className={'priority-icon ml-2 px-2 py-1 rounded-lg ' + taskData.priority}>
							<span className="ml-2 text-sm">
								{taskData.priority}
							</span>
						</div>
					)}
				</div>

				<div className="flex justify-between items-center py-1">
					<span className="hidden md:block text-sm font-bold text-gray-500">
						Workspace
					</span>
					{isEditWorkspace ? (
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
					 ) : (
						<div className="workspace-icon mt-2 px-2 py-1 rounded-lg bg-light-blue">
							<span className="ml-2 text-sm">
								{convertedWorkspace}{' '}
							</span>
						</div>)}
				</div>
			</div>

			{isEditDescription ? (
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
			) : (
				<div className="mt-4 px-2">
					<div className="bg-gray-100 description-icon p-3 rounded-lg">
						<span className="ml-2 text-gray-600 whitespace-pre-line">
							{editedTask?.description}
						</span>
					</div>
				</div>
			)}
		</form>
	);
};

export default ModalEditTask;
