import React, { useState } from 'react';

const CreateTaskAndWorkspace = () => {
	const [activeTab, setActiveTab] = useState('tab1');

	return (
		<section
			id="modal-to-create"
			className="modal bg-[rgba(0,0,0,0.8)] transition-all ease-in-out duration-300">
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

					<div
						id="tab-content1"
						className={`${
							activeTab === 'tab1' ? 'block' : 'hidden'
						} p-5 border-t border-[#5a385f]`}>
						<h2 className="text-xl mb-2.5 text-center">
							Titre de l'onglet 1
						</h2>
						{/* Autre contenu */}
					</div>

					<div
						id="tab-content2"
						className={`${
							activeTab === 'tab2' ? 'block' : 'hidden'
						} p-5 border-t border-[#5a385f]`}>
						<h2 className="text-xl mb-2.5 text-center">
							Titre de l'onglet 2
						</h2>
						{/* Autre contenu */}
					</div>
				</div>
			</div>
		</section>
	);
};

export default CreateTaskAndWorkspace;
