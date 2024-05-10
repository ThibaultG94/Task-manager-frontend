import React, { useEffect, useRef, useState } from 'react';
import Tabs from '../../ModalForm/Tabs';
import ListWorkspaces from '../../DashboardPage/ListWorkspaces';
import SentOutWorkspaceInvitations from './SentOutWorkspaceInvitations';
import ReceivedWorkspaceInvitesList from './ReceivedWorkspaceInvitesList';

const WorkspaceManageModal = ({ userId, setIsWorkspaceModalOpen, tab, contactId }) => {
	const modalWorkspaceRef = useRef(null);

	const [activeTab, setActiveTab] = useState(tab);
	const [isClosing, setIsClosing] = useState(false);

	const tabData = [
		{
			id: 'tab1',
			label: 'Liste des Workspaces',
			icon: 'fas fa-th-large',
			component: <ListWorkspaces userId={userId} />,
		},
		{
			id: 'tab2',
			label: 'Invitations Workspaces Envoyées',
			icon: 'fas fa-paper-plane',
			component: <SentOutWorkspaceInvitations />,
		},
		{
			id: 'tab3',
			label: 'Invitations Workspaces Reçues',
			icon: 'fas fa-envelope-open',
			component: <ReceivedWorkspaceInvitesList userId={userId} />,
		},
	];

	const closeWorkspaceModal = () => {
		setIsWorkspaceModalOpen(false);
	};

	const closeHandler = () => {
        setIsClosing(true);
        setTimeout(() => {
            closeWorkspaceModal();
        }, 300);
    };

    useEffect(() => {
        const currentModal = modalWorkspaceRef.current;
        if (currentModal) {
            currentModal.style.animation = `${isClosing ? 'slideRightToLeftReverse' : 'slideLeftToRightReverse'} 0.3s forwards`;
        }
    }, [isClosing]);

	return (
		<section
			className="bg-modal-bg duration-300 ease-in-out fixed h-full text-black left-0 top-0 transition-all w-full z-10"
			onClick={closeHandler}>
			<div
				className="bg-white border border-gray-400 flex flex-col mx-auto my-modal-margin rounded-lg shadow-md w-modal-xs custom-xs:w-modal-sm md:w-modal-md lg:w-modal-lg xl:w-modal-xl"
				onClick={(e) => e.stopPropagation()} ref={modalWorkspaceRef}>
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

export default WorkspaceManageModal;
