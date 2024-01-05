import React, { useEffect, useRef, useState } from 'react';
import CloseButton from '../modal/CloseButton';
import ModalDisplayWorkspace from './ModalDisplayWorkspace';
import DeleteWorkspace from './DeleteWorkspace';
import EditWorkspace from './EditWorkspace';
import ModalEditWorkspace from './ModalEditWorkspace';
import CancelEditWorkspace from './CancelEditWorkspace';
import SaveEditedWorkspace from './SaveEditedWorkspace';

const HandleModalWorkspace = ({
	closeModalWorkspace,
	setIsModalWorkspaceOpen,
	isEditingWorkspace,
	setIsEditingWorkspace,
	selectedWorkspace,
}) => {
	const modalWorkspaceRef = useRef(null);
	const [workspaceData, setWorkspaceData] = useState({
		_id: '',
		title: '',
		description: '',
		members: [],
		membersName: [],
		taskStatusCount: [],
	});

	const handleEditWorkspace = () => {
		setIsEditingWorkspace(true);
	};

	const handleCancelEditWorkspace = () => {
		setIsEditingWorkspace(false);
	};

	useEffect(() => {
		setWorkspaceData({
			_id: selectedWorkspace.workspaceId,
			title: selectedWorkspace.title,
			description: selectedWorkspace.description,
			members: selectedWorkspace.members,
			membersName: selectedWorkspace.membersName,
			taskStatusCount: selectedWorkspace.taskStatusCount,
		});
	}, [selectedWorkspace]);

	return (
		<section
			className="bg-black bg-opacity-50 fixed h-full inset-0 w-full z-10"
			onClick={closeModalWorkspace}>
			<div
				className="flex flex-col bg-white fixed left-1/2 max-h-[85vh] max-w-lg overflow-hidden transform -translate-x-1/2 top-10 rounded-lg shadow-md custom-xs:min-w-[400px] min-w-[300px] z-10"
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
								workspaceData={workspaceData}
								setWorkspaceData={setWorkspaceData}
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
									workspaceData={workspaceData}
								/>
								<EditWorkspace
									handleEditWorkspace={handleEditWorkspace}
								/>
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
								setIsEditingWorkspace={setIsEditingWorkspace}
								setIsModalWorkspaceOpen={
									setIsModalWorkspaceOpen
								}
								workspaceData={workspaceData}
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default HandleModalWorkspace;
