import React, { useState } from 'react';
import Tabs from '../../ModalForm/Tabs';
import CreateTaskForm from './CreateTaskForm';
import CreateWorkspaceForm from './CreateWorkspaceForm';

const CreateTaskAndWorkspace = ({
	userId,
	setIsCreateTaskOrWorkspaceModalOpen,
}) => {
	const [activeTab, setActiveTab] = useState('tab1');
	const tabData = [
		{
			id: 'tab1',
			label: 'Tâche',
			component: (
				<CreateTaskForm
					userId={userId}
					setIsModalOpen={setIsCreateTaskOrWorkspaceModalOpen}
				/>
			),
		},
		{
			id: 'tab2',
			label: 'Workspace',
			component: (
				<CreateWorkspaceForm
					userId={userId}
					setIsModalOpen={
						setIsCreateTaskOrWorkspaceModalOpen
					}
				/>
			),
		},
	];

	const closeModal = () => {
		setIsCreateTaskOrWorkspaceModalOpen(false);
	};

	return (
		<section
			className="bg-modal-bg duration-300 ease-in-out fixed h-full text-black left-0 top-0 transition-all w-full z-10"
			onClick={closeModal}>
			<div
				className="bg-[#f8f7fd] border border-gray-400 flex flex-col mx-auto my-modal-margin rounded-lg shadow-md w-modal-xs custom-xs:w-modal-sm md:w-modal-md lg:w-modal-lg xl:w-modal-xl"
				onClick={(e) => e.stopPropagation()}>
				<Tabs
					tabs={tabData}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					closeModal={closeModal}
				/>
			</div>
		</section>
	);
};

export default CreateTaskAndWorkspace;
