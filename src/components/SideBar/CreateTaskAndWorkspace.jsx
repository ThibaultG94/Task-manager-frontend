import React, { useState } from 'react';
import Tabs from '../modal/Tabs';
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
					setIsCreateTaskOrWorkspaceModalOpen={
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
				className="bg-gray-100 border border-gray-400 flex flex-col mx-auto my-modal-margin rounded-lg shadow-md min-w-min w-3/4 max-w-max"
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
