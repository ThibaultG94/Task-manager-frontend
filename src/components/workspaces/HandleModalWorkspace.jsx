import React, { useEffect, useRef, useState } from 'react';
import CloseButton from '../modal/CloseButton';
import ModalDisplayWorkspace from './ModalDisplayWorkspace';
import DeleteWorkspace from './DeleteWorkspace';
import EditWorkspace from './EditWorkspace';
import ModalEditWorkspace from './ModalEditWorkspace';
import CancelEditWorkspace from './CancelEditWorkspace';
import SaveEditedWorkspace from './SaveEditedWorkspace';
import { useSelector } from 'react-redux';
import { selectUserContacts } from '../../store/selectors/userSelectors';

const HandleModalWorkspace = ({
	closeModalWorkspace,
	setIsModalWorkspaceOpen,
	isEditingWorkspace,
	setIsEditingWorkspace,
	selectedWorkspace,
	userId,
}) => {
	const userContacts = useSelector(selectUserContacts);
	const [contacts, setContacts] = useState([]);
	const [selectedMembers, setSelectedMembers] = useState([]);
	const modalWorkspaceRef = useRef(null);
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
									<EditWorkspace
										handleEditWorkspace={
											handleEditWorkspace
										}
									/>
								)}
							</div>
						</div>
					) : (
						<div className="flex justify-between px-2 mb-2 mt-0.5">
							<CancelEditWorkspace
								handleCancelEditWorkspace={
									handleCancelEditWorkspace
								}
							/>
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
