import React, { useRef, useState } from 'react';
import EditTitle from './EditTitle';
import EditStatus from './EditStatus';
import EditPriority from './EditPriority';
import EditDeadline from './EditDeadline';
import EditDescription from './EditDescription';
import EditComments from './EditComments';
import EditWorkspace from './EditWorkspace';
import EditAssignedTo from './EditAssignedTo';
import SaveEditedTask from './SaveEditedTask';
import DeleteTask from './DeleteTask';
import CloseButton from '../modal/CloseButton';
import EditIcon from './EditIcon';
import ModalDisplayTask from './ModalDisplayTask';
import ModalEditTask from './ModalEditTask';

const ModalTask = ({ closeModal, setIsModalOpen, isEditing, setIsEditing }) => {
	const modalRef = useRef(null);
	const [saveMessage, setSaveMessage] = useState('');
	const [deleteMessage, setDeleteMessage] = useState('');

	const handleEditTask = () => {
		setIsEditing(true);
	};

	return (
		<section
			className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-10"
			onClick={closeModal}>
			<div
				className="absolute z-10 top-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-7 px-5 rounded-md w-[52vw]"
				ref={modalRef}
				onClick={(e) => e.stopPropagation()}>
				{!isEditing && (
					<EditIcon
						handleEditTask={handleEditTask}
						quickEdit={false}
					/>
				)}
				<CloseButton onClose={closeModal} modalTabs={false} />

				{!isEditing && <ModalDisplayTask />}
				{isEditing && <ModalEditTask />}

				<div className="action-buttons">
					<DeleteTask
						setIsModalOpen={setIsModalOpen}
						setDeleteMessage={setDeleteMessage}
					/>
					<SaveEditedTask
						setIsModalOpen={setIsModalOpen}
						setSaveMessage={setSaveMessage}
					/>
				</div>
				{saveMessage && (
					<span id="message-after-saving">{saveMessage}</span>
				)}
				{deleteMessage && (
					<span id="message-after-delete">{deleteMessage}</span>
				)}
			</div>
		</section>
	);
};

export default ModalTask;
