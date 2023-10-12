import React, { useState } from 'react';
import EditTitle from './EditTitle';
import EditStatus from './EditStatus';
import EditPriority from './EditPriority';
import EditDeadline from './EditDeadline';
import EditDescription from './EditDescription';
import EditComments from './EditComments';
import EditWorkspace from './EditWorkspace';
import EditAssignedTo from './EditAssignedTo';
import SaveEditedTask from './SaveEditedTask';

const ModalTask = ({ closeModal, modalRef, task, setIsModalOpen }) => {
	const [saveMessage, setSaveMessage] = useState('');

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
					<EditTitle />

					<EditStatus />

					<EditPriority />

					<EditDeadline />

					<EditDescription />

					{/* <EditComments /> */}

					<EditWorkspace />

					<EditAssignedTo />
				</div>
				<div className="action-buttons">
					<button className="delete-button">
						<i className="fas fa-trash-alt"></i> Supprimer
					</button>
					<SaveEditedTask
						setIsModalOpen={setIsModalOpen}
						setSaveMessage={setSaveMessage}
					/>
				</div>
				{saveMessage && (
					<span id="message-after-saving">{saveMessage}</span>
				)}
			</div>
		</section>
	);
};

export default ModalTask;
