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
			className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-10"
			onClick={closeModal}>
			<div
				className="absolute z-10 top-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-7 px-5 rounded-md w-[52vw]"
				ref={modalRef}
				onClick={(e) => e.stopPropagation()}>
				<CloseButton onClose={closeModal} modalTabs={false} />

				{!isEditing && (
					<div>
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
						<div className="flex justify-between mt-4">
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
