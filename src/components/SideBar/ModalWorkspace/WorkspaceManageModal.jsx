import React, { useState } from 'react';
import Tabs from '../../ModalForm/Tabs';
import ListWorkspaces from '../../DashboardPage/ListWorkspaces';
import SentOutWorkspaceInvitations from './SentOutWorkspaceInvitations';
import ReceivedWorkspaceInvitesList from './ReceivedWorkspaceInvitesList';
import SendWorkspaceInviteForm from './SendWorkspaceInviteForm';

const WorkspaceManageModal = ({ userId, setIsWorkspaceModalOpen, tab, contactId }) => {
	const [activeTab, setActiveTab] = useState(tab);
	const tabData = [
		{
			id: 'tab1',
			label: 'Liste des Workspaces',
			component: <ListWorkspaces userId={userId} />,
		},
		{
			id: 'tab2',
			label: 'Inviter un contact à un Workspace',
			component: <SendWorkspaceInviteForm userId={userId} contactId={contactId} />,
		},
		{
			id: 'tab3',
			label: 'Invitations Workspaces Envoyées',
			component: <SentOutWorkspaceInvitations userId={userId} />,
		},
		{
			id: 'tab4',
			label: 'Invitations Workspaces Reçues',
			component: <ReceivedWorkspaceInvitesList userId={userId} />,
		},
	];

	const closeWorkspaceModal = () => {
		setIsWorkspaceModalOpen(false);
	};

	return (
		<section
			className="bg-modal-bg duration-300 ease-in-out fixed h-full text-black left-0 top-0 transition-all w-full z-10"
			onClick={closeWorkspaceModal}>
			<div
				className="bg-white border border-gray-400 flex flex-col mx-auto my-modal-margin rounded-lg shadow-md min-w-72 sm:min-w-96 max-w-screen-md"
				onClick={(e) => e.stopPropagation()}>
				<Tabs
					tabs={tabData}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					closeModal={closeWorkspaceModal}
				/>
			</div>
		</section>
	);
};

export default WorkspaceManageModal;
