import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
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

	const modalRef = useRef(null);

	const [isSuperAdmin, setIsSuperAdmin] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isTaskOwner, setIsTaskOwner] = useState(false);
	
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
			if (taskData && taskData.selectedWorkspace && taskData.selectedWorkspace !== 'default') {
				const workspace = userWorkspaces.find(
					(ws) => ws._id === taskData.selectedWorkspace
					);
				const userId = await getUserId();
		
				const isSuperAdminVerification = workspace.members.some(
				  (member) => member.userId === userId && member.role === 'superadmin'
				);
				const isAdminVerification = workspace.members.some(
				  (member) => member.userId === userId && member.role === 'admin'
				);
				const isTaskOwner = taskData.userId == userId;
		
				setIsSuperAdmin(isSuperAdminVerification);
				setIsAdmin(isAdminVerification);
				setIsTaskOwner(isTaskOwner);
			}
		  };

		checkUserPrivileges();
	}, [taskData]);

	return (
		<section
			className="bg-black bg-opacity-50 fixed h-full inset-0 w-full z-10"
			onClick={closeModal}>
			<div
				className="flex flex-col bg-white fixed left-1/2 max-h-[85vh] max-w-lg overflow-hidden transform -translate-x-1/2 top-20 rounded-lg shadow-md custom-xs:min-w-[400px] min-w-[300px] z-10"
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
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default HandleModalTask;
