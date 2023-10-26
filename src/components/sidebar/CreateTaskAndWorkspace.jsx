import React, { useState } from 'react';
import CreateTaskForm from './CreateTaskForm';
import CreateWorkspaceForm from './CreateWorkspaceForm';

const CreateTaskAndWorkspace = ({ userId, setIsModalOpen }) => {
	const [activeTab, setActiveTab] = useState('tab1');

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<section
			id="modal-to-create"
			className="modal bg-[rgba(0,0,0,0.8)] transition-all ease-in-out duration-300 text-black"
			onClick={closeModal}>
			<div
				className="bg-gray-100 mx-auto my-[2%] border border-gray-400 w-[60%] max-w-[800px] flex flex-col text-right px-5 rounded-lg shadow-md min-w-[400px]"
				onClick={(e) => e.stopPropagation()}>
				<div className="tabs">
					<input
						type="radio"
						name="tabs"
						id="tab1"
						checked={activeTab === 'tab1'}
						onChange={() => setActiveTab('tab1')}
					/>
					<label
						htmlFor="tab1"
						className={`${
							activeTab === 'tab1'
								? 'bg-[#171f39] text-[#eaefff] cursor-default'
								: 'cursor-pointer'
						}`}>
						Tâche
					</label>

					<input
						type="radio"
						name="tabs"
						id="tab2"
						checked={activeTab === 'tab2'}
						onChange={() => setActiveTab('tab2')}
					/>
					<label
						htmlFor="tab2"
						className={`${
							activeTab === 'tab2'
								? 'bg-[#171f39] text-[#eaefff] cursor-default'
								: 'cursor-pointer'
						}`}>
						Workspace
					</label>

					<span
						id="close-button"
						className="text-3xl cursor-pointer"
						onClick={closeModal}>
						&times;
					</span>

					{activeTab === 'tab1' ? (
						<CreateTaskForm
							userId={userId}
							setIsModalOpen={setIsModalOpen}
						/>
					) : (
						<CreateWorkspaceForm
							userId={userId}
							setIsModalOpen={setIsModalOpen}
						/>
					)}
				</div>
			</div>
		</section>
	);
};

export default CreateTaskAndWorkspace;
