import React, { useState } from 'react';
import Tabs from '../modal/Tabs';
import CreateTaskForm from './CreateTaskForm';
import CreateWorkspaceForm from './CreateWorkspaceForm';

const CreateTaskAndWorkspace = ({ userId, setIsModalOpen }) => {
	const [activeTab, setActiveTab] = useState('tab1');
	const tabData = [
		{
			id: 'tab1',
			label: 'Tâche',
			component: (
				<CreateTaskForm
					userId={userId}
					setIsModalOpen={setIsModalOpen}
				/>
			),
		},
		{
			id: 'tab2',
			label: 'Workspace',
			component: (
				<CreateWorkspaceForm
					userId={userId}
					setIsModalOpen={setIsModalOpen}
				/>
			),
		},
	];

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<section
			id="modal-to-create"
			className="modal bg-modal-bg transition-all ease-in-out duration-300 text-black"
			onClick={closeModal}>
			<div
				className="bg-gray-100 mx-auto my-modal-margin border border-gray-400 w-[70%] max-w-[960px] flex flex-col rounded-lg shadow-md min-w-[400px]"
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
