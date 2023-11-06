import React, { useRef, useState } from 'react';
import SaveEditedTask from './SaveEditedTask';
import DeleteTask from './DeleteTask';
import CloseButton from '../modal/CloseButton';
import EditIcon from './EditIcon';
import ModalDisplayTask from './ModalDisplayTask';
import ModalEditTask from './ModalEditTask';
import CancelEditTask from './CancelEditTask';
import EditTask from './EditTask';

const ModalTask = ({ closeModal, setIsModalOpen, isEditing, setIsEditing }) => {
	const modalRef = useRef(null);
	const [saveMessage, setSaveMessage] = useState('');
	const [deleteMessage, setDeleteMessage] = useState('');

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

				{!isEditing && <ModalDisplayTask />}
				{isEditing && <ModalEditTask />}

				{!isEditing && (
					<div className="action-buttons">
						<DeleteTask
							setIsModalOpen={setIsModalOpen}
							setDeleteMessage={setDeleteMessage}
						/>
						<EditTask handleEditTask={handleEditTask} />
					</div>
				)}
				{isEditing && (
					<div className="action-buttons">
						<CancelEditTask handleCancelEdit={handleCancelEdit} />
						<SaveEditedTask
							setIsModalOpen={setIsModalOpen}
							setSaveMessage={setSaveMessage}
						/>
					</div>
				)}
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
