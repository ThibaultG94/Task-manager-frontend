import React, { useRef, useState } from 'react';
import SaveEditedTask from './SaveEditedTask';
import DeleteTask from './DeleteTask';
import CloseButton from '../modal/CloseButton';
import ModalDisplayTask from './ModalDisplayTask';
import ModalEditTask from './ModalEditTask';
import CancelEditTask from './CancelEditTask';
import EditTask from './EditTask';

const HandleModalTask = ({
	closeModal,
	setIsModalOpen,
	isEditing,
	setIsEditing,
}) => {
	const modalRef = useRef(null);
	const [taskData, setTaskData] = useState({
		_id: '',
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

	return (
		<section
			className="bg-black bg-opacity-50 fixed h-full inset-0 w-full z-10"
			onClick={closeModal}>
			<div
				className="flex flex-col bg-white fixed left-1/2 max-h-[85vh] max-w-lg overflow-hidden transform -translate-x-1/2 top-10 rounded-lg shadow-md custom-xs:min-w-[400px] min-w-[300px] z-10"
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
								<DeleteTask setIsModalOpen={setIsModalOpen} />
								<EditTask handleEditTask={handleEditTask} />
							</div>
						</div>
					) : (
						<div className="flex justify-between px-2">
							<CancelEditTask
								handleCancelEdit={handleCancelEdit}
							/>
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
