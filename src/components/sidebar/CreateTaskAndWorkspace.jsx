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
				<div className="flex flex-col">
					<div className="flex justify-between items-center">
						<div className="flex">
							<input
								type="radio"
								name="tabs"
								id="tab1"
								checked={activeTab === 'tab1'}
								onChange={() => setActiveTab('tab1')}
								className="hidden"
							/>
							<label
								htmlFor="tab1"
								className={`${
									activeTab === 'tab1'
										? 'text-lg bg-[#171f39] text-[#eaefff] cursor-default inline-block p-2 transition-bg duration-300'
										: 'text-lg text-gray-800 hover:text-gray-700 cursor-pointer inline-block p-2 transition-bg duration-300'
								}`}>
								Tâche
							</label>

							<input
								type="radio"
								name="tabs"
								id="tab2"
								checked={activeTab === 'tab2'}
								onChange={() => setActiveTab('tab2')}
								className="hidden"
							/>
							<label
								htmlFor="tab2"
								className={`${
									activeTab === 'tab2'
										? 'text-lg bg-[#171f39] text-[#eaefff] cursor-default inline-block p-2 transition-bg duration-300'
										: 'text-lg text-gray-800 hover:text-gray-700 cursor-pointer inline-block p-2 transition-bg duration-300'
								}`}>
								Workspace
							</label>
						</div>
						<span className="cursor-pointer" onClick={closeModal}>
							<svg
								width="40"
								height="40"
								viewBox="0 0 40 40"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<line
									x1="10"
									y1="10"
									x2="30"
									y2="30"
									stroke="currentColor"
									stroke-width="2"
								/>
								<line
									x1="30"
									y1="10"
									x2="10"
									y2="30"
									stroke="currentColor"
									stroke-width="2"
								/>
							</svg>
						</span>
					</div>

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
