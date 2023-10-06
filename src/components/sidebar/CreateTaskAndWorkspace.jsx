import React, { useState } from 'react';
import CreateTaskForm from './CreateTaskForm';
import CreateWorkspaceForm from './CreateWorkspaceForm';

const CreateTaskAndWorkspace = () => {
	const [activeTab, setActiveTab] = useState('tab1');

	return (
		<section
			id="modal-to-create"
			className="modal bg-[rgba(0,0,0,0.8)] transition-all ease-in-out duration-300 text-black">
			<div className="modal-content rounded-lg bg-white shadow-md min-w-[400px] px-5">
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
								? 'bg-[#171f39] text-[#eaefff]'
								: ''
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
								? 'bg-[#171f39] text-[#eaefff]'
								: ''
						}`}>
						Workspace
					</label>

					<span id="close-button" className="text-3xl">
						&times;
					</span>

					{activeTab === 'tab1' ? (
						<CreateTaskForm />
					) : (
						<CreateWorkspaceForm />
					)}
				</div>
			</div>
		</section>
	);
};

export default CreateTaskAndWorkspace;