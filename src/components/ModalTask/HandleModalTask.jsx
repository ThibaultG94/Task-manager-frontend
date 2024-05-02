import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import CloseButton from '../Buttons/CloseButton';
import ModalDisplayTask from './ModalDisplayTask';
import ModalEditTask from './ModalEditTask';
import DeleteTask from './DeleteTask';
import SaveEditedTask from './SaveEditedTask';
import getUserId from '../../api/users/getUserId';

const HandleModalTask = ({
	closeModal,
	setIsModalOpen,
	isEditing,
	setIsEditing,
}) => {
	const userWorkspaces = useSelector(selectWorkspaces);
	const editedTask = useSelector(selectEditedTask);

	const modalRef = useRef(null);

	const [isSuperAdmin, setIsSuperAdmin] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isTaskOwner, setIsTaskOwner] = useState(false);
	const [workspaceTask, setWorkspaceTask] = useState([]);
	
	const [taskData, setTaskData] = useState({
		_id: '',
		userId: '',
		title: '',
		status: 'Pending',
		priority: 'Medium',
		deadline: '',
		description: '',
		selectedWorkspace: 'default',
		workspaceMembersIds: '',
		workspaceMembers: '',
		assignedTo: [],
		selectedMember: 'default',
		category: '',
	});

	const handleEditTask = () => {
		setIsEditing(true);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
	};

	useEffect(() => {
		const checkUserPrivileges = async () => {
			if (editedTask && editedTask.workspaceId) {
				const workspace = userWorkspaces.find(
					(ws) => ws._id === editedTask.workspaceId
					);
				setWorkspaceTask(workspace);
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

		checkUserPrivileges();
	}, [taskData, editedTask]);

	return (
		<section
			className="bg-black bg-opacity-50 fixed h-full inset-0 w-full z-10"
			onClick={closeModal}>
			<div
				className="flex flex-col bg-white fixed left-1/2 max-h-[85vh] max-w-lg overflow-hidden transform -translate-x-1/2 top-20 rounded-lg shadow-md w-modal-xs custom-xs:w-modal-sm md:w-modal-md lg:w-modal-lg xl:w-modal-xl z-10"
				ref={modalRef}
				onClick={(e) => e.stopPropagation()}>
				<div className="flex-grow overflow-y-auto">
					{!isEditing ? (
						<>
							<CloseButton
								onClose={closeModal}
								modalTabs={false}
							/>
							<ModalDisplayTask />
						</>
					) : (
						<>
							<ModalEditTask
								taskData={taskData}
								setTaskData={setTaskData}
							/>
						</>
					)}
				</div>

				<div className="mt-auto p-2">
					{!isEditing ? (
						<div className="flex justify-end">
							<div className="flex justify-between">
								{isSuperAdmin || isAdmin || isTaskOwner ? (
									<DeleteTask setIsModalOpen={setIsModalOpen} />
								) : (
									''
								)}
								<button
									className="button bg-light-blue-2 hover:bg-dark-blue mb-3 mr-8"
									onClick={handleEditTask}>
									<i className="fas fa-pencil-alt mr-2"></i> Editer
								</button>
							</div>
						</div>
					) : (
						<div className="flex justify-between px-2 mb-2 mt-0.5">
							<button
								onClick={() => handleCancelEdit()}
								className="button bg-red-error hover:bg-red-error-2 mt-2 px-3">
								<i className="fas fa-times mr-2"></i>
								Annuler
							</button>
							<SaveEditedTask
								setIsEditing={setIsEditing}
								setIsModalOpen={setIsModalOpen}
								taskData={taskData}
								workspaceTask={workspaceTask}
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default HandleModalTask;
