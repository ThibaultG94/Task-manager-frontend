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
				className="bg-white fixed left-1/2 max-h-[85vh] max-w-lg overflow-y-auto transform -translate-x-1/2 top-10 rounded-lg shadow-md w-1/2 z-10"
				ref={modalRef}
				onClick={(e) => e.stopPropagation()}>
				{!isEditing && (
					<div>
						<CloseButton onClose={closeModal} modalTabs={false} />
						<ModalDisplayTask />
						<div className="flex justify-end">
							<DeleteTask setIsModalOpen={setIsModalOpen} />
							<EditTask handleEditTask={handleEditTask} />
						</div>
					</div>
				)}

				{isEditing && (
					<div>
						<ModalEditTask
							taskData={taskData}
							setTaskData={setTaskData}
						/>
						<div className="flex justify-between my-4 px-4">
							<CancelEditTask
								handleCancelEdit={handleCancelEdit}
							/>
							<SaveEditedTask
								setIsModalOpen={setIsModalOpen}
								taskData={taskData}
							/>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default HandleModalTask;
