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

const ModalTask = ({ closeModal, setIsModalOpen }) => {
	const modalRef = useRef(null);
	const [saveMessage, setSaveMessage] = useState('');
	const [deleteMessage, setDeleteMessage] = useState('');

	return (
		<section
			className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-10"
			onClick={closeModal}>
			<div
				className="task-modal z-100"
				ref={modalRef}
				onClick={(e) => e.stopPropagation()}>
				<span className="task-modal-close" onClick={closeModal}>
					&times;
				</span>
				<div className="task-details">
					<EditTitle itemTitle={false} modalTitle={true} />

					<EditStatus />

					<EditPriority />

					<EditDeadline />

					<EditDescription />

					{/* <EditComments /> */}

					<EditWorkspace />

					<EditAssignedTo />
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

export default ModalTask;
