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

const ModalDisplayTask = ({ closeModal, setIsModalOpen, setIsEditing }) => {
	const modalRef = useRef(null);
	const [saveMessage, setSaveMessage] = useState('');
	const [deleteMessage, setDeleteMessage] = useState('');

	const handleEditTask = () => {
		setIsModalOpen(false);
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
				<EditIcon handleEditTask={handleEditTask} quickEdit={false} />
				<CloseButton onClose={closeModal} modalTabs={false} />

				<div className="py-3">
					<EditTitle itemTitle={false} modalTitle={true} />

					<div className="flex mt-3 mb-2">
						<EditStatus />
						<EditPriority />
						<EditDeadline />
					</div>

					<EditDescription />

					<div className="flex">
						<EditWorkspace />
						<EditAssignedTo />
					</div>
					{/* <EditComments /> */}
				</div>
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

export default ModalDisplayTask;
