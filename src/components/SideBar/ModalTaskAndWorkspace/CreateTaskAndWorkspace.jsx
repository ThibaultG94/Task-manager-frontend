import React, { useEffect, useRef, useState } from 'react';
import Tabs from '../../ModalForm/Tabs';
import CreateTaskForm from './CreateTaskForm';
import CreateWorkspaceForm from './CreateWorkspaceForm';

const CreateTaskAndWorkspace = ({
	userId,
	setIsCreateTaskOrWorkspaceModalOpen,
}) => {
	const modalCreateRef = useRef(null);

	const [activeTab, setActiveTab] = useState('tab1');
	const [isClosing, setIsClosing] = useState(false);
	const [formState, setFormState] = useState(() => {
		const savedState = localStorage.getItem('createFormState');
		return savedState ? JSON.parse(savedState) : {
			taskForm: {},
			workspaceForm: {},
		};
	});
	const tabData = [
		{
			id: 'tab1',
			label: 'Tâche',
			icon: 'fas fa-tasks',
			component: (
				<CreateTaskForm
					userId={userId}
					setIsModalOpen={setIsCreateTaskOrWorkspaceModalOpen}
					initialState={formState.taskForm}
					updateFormState={(state) => updateFormState('taskForm', state)}
				/>
			),
		},
		{
			id: 'tab2',
			label: 'Workspace',
			icon: 'fas fa-building',
			component: (
				<CreateWorkspaceForm
					userId={userId}
					setIsModalOpen={
						setIsCreateTaskOrWorkspaceModalOpen
					}
					initialState={formState.workspaceForm}
					updateFormState={(state) => updateFormState('workspaceForm', state)}
				/>
			),
		},
	];

	const updateFormState = (formType, newState) => {
		const updatedState = {
			...formState,
			[formType]: newState
		};
		setFormState(updatedState);
		localStorage.setItem('createFormState', JSON.stringify(updatedState));
	};

	useEffect(() => {
		localStorage.setItem('createFormState', JSON.stringify(formState));
	}, [formState]);

	const closeModal = () => {
		setIsCreateTaskOrWorkspaceModalOpen(false);
	};

	const closeHandler = () => {
        setIsClosing(true);
        setTimeout(() => {
            closeModal();
        }, 300);
    };

    useEffect(() => {
        const currentModal = modalCreateRef.current;
        if (currentModal) {
            currentModal.style.animation = `${isClosing ? 'slideRightToLeftReverse' : 'slideLeftToRightReverse'} 0.3s forwards`;
        }
    }, [isClosing]);

	return (
		<section
			className="bg-modal-bg duration-300 ease-in-out fixed h-full text-black left-0 top-0 transition-all w-full z-10"
			onClick={closeHandler}>
			<div
				className="bg-[#f8f7fd] border border-gray-400 flex flex-col mx-auto my-modal-margin rounded-lg shadow-md w-modal-xs custom-xs:w-modal-sm md:w-modal-md"
				onClick={(e) => e.stopPropagation()} ref={modalCreateRef}>
				<Tabs
					tabs={tabData}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					closeModal={closeHandler}
				/>
			</div>
		</section>
	);
};

export default CreateTaskAndWorkspace;
