import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserContacts } from '../../store/selectors/userSelectors';
import CloseButton from '../ModalForm/CloseButton';
import ModalDisplayWorkspace from './ModalDisplayWorkspace';
import ModalEditWorkspace from './ModalEditWorkspace';
import DeleteWorkspace from './DeleteWorkspace';
import SaveEditedWorkspace from './SaveEditedWorkspace';

const HandleModalWorkspace = ({
	closeModalWorkspace,
	setIsModalWorkspaceOpen,
	isEditingWorkspace,
	setIsEditingWorkspace,
	selectedWorkspace,
	userId,
}) => {
	const modalWorkspaceRef = useRef(null);
	const userContacts = useSelector(selectUserContacts);
	
	const [contacts, setContacts] = useState([]);
	const [selectedMembers, setSelectedMembers] = useState([]);
	const [workspaceDataChange, setWorkspaceDataChange] = useState({
		_id: '',
		title: '',
		description: '',
		members: [],
		membersName: [],
		taskStatusCount: [],
		isDefault: false,
	});

	const handleEditWorkspace = () => {
		setIsEditingWorkspace(true);
	};

	const handleCancelEditWorkspace = () => {
		setIsEditingWorkspace(false);
	};

	useEffect(() => {
		if (!isEditingWorkspace) {
			setWorkspaceDataChange({
				_id: '',
				title: '',
				description: '',
				members: [],
				membersName: [],
				taskStatusCount: [],
				isDefault: false,
			});
		}
	}, [isEditingWorkspace]);

	useEffect(() => {
		setWorkspaceDataChange({
			_id: selectedWorkspace.workspaceId,
			title: selectedWorkspace.title,
			description: selectedWorkspace.description,
			members: selectedWorkspace.members,
			taskStatusCount: selectedWorkspace.taskStatusCount,
			invitationStatus: selectedWorkspace.invitationStatus,
			isDefault: selectedWorkspace.isDefault,
		});
		setSelectedMembers(
			selectedWorkspace.members
				.filter((memberId) => memberId.userId !== userId)
				.map((member) => ({
					id: member.userId,
					username: member.username,
					role: member.role,
				}))
		);
	}, [selectedWorkspace]);

	useEffect(() => {
		if (userContacts) setContacts(userContacts);
	}, [userContacts]);

	return (
		<section
			className="bg-black bg-opacity-50 fixed h-full inset-0 w-full z-10"
			onClick={closeModalWorkspace}>
			<div
				className="flex flex-col bg-white fixed left-1/2 max-h-[90vh] max-w-lg overflow-hidden transform -translate-x-1/2 top-20 rounded-lg shadow-md custom-xs:min-w-[400px] min-w-[300px] z-10"
				ref={modalWorkspaceRef}
				onClick={(e) => e.stopPropagation()}>
				<div className="flex-grow overflow-y-auto">
					{!isEditingWorkspace ? (
						<>
							<CloseButton
								onClose={closeModalWorkspace}
								modalTabs={false}
							/>
							<ModalDisplayWorkspace
								selectedWorkspace={selectedWorkspace}
							/>
						</>
					) : (
						<>
							<ModalEditWorkspace
								contacts={contacts}
								selectedMembers={selectedMembers}
								setSelectedMembers={setSelectedMembers}
								workspaceDataChange={workspaceDataChange}
								setWorkspaceDataChange={setWorkspaceDataChange}
							/>
						</>
					)}
				</div>

				<div className="mt-auto p-2">
					{!isEditingWorkspace ? (
						<div className="flex justify-end">
							<div className="flex justify-between">
								<DeleteWorkspace
									setIsModalWorkspaceOpen={
										setIsModalWorkspaceOpen
									}
									workspaceDataChange={workspaceDataChange}
								/>
								{selectedWorkspace.isDefault === 'false' && (
									<button
										className="button bg-light-blue-2 hover:bg-dark-blue mb-3 mr-8"
										onClick={handleEditWorkspace}>
										<i className="fas fa-pencil-alt mr-2"></i> Editer
									</button>
								)}
							</div>
						</div>
					) : (
						<div className="flex justify-between px-2 mb-2 mt-0.5">
							<button
								onClick={() => handleCancelEditWorkspace()}
								className="button bg-red-error hover:bg-red-error-2 mt-2 px-3">
								<i className="fas fa-times mr-2"></i>
								Annuler
							</button>
							<SaveEditedWorkspace
								selectedMembers={selectedMembers}
								setIsEditingWorkspace={setIsEditingWorkspace}
								setIsModalWorkspaceOpen={
									setIsModalWorkspaceOpen
								}
								userId={userId}
								workspaceDataChange={workspaceDataChange}
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default HandleModalWorkspace;
