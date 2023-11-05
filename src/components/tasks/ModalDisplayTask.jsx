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
	);
};

export default ModalDisplayTask;
