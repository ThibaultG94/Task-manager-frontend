import React, { useState } from 'react';
import SendInviteForm from './SendInviteForm';
import ReceivedInvitesList from './ReceivedInvitesList';
import Tabs from '../modal/Tabs';
import SentOutInvitations from './SentOutInvitations';

const InviteMemberModal = ({ userId, setIsInvitationModalOpen }) => {
	const [activeTab, setActiveTab] = useState('tab1');
	const tabData = [
		{
			id: 'tab1',
			label: 'Ajouter un contact',
			component: <SendInviteForm userId={userId} />,
		},
		{
			id: 'tab2',
			label: 'Invitations Envoyées',
			component: <SentOutInvitations userId={userId} />,
		},
		{
			id: 'tab3',
			label: 'Invitations Reçues',
			component: <ReceivedInvitesList userId={userId} />,
		},
	];

	const closeInvitationModal = () => {
		setIsInvitationModalOpen(false);
	};

	return (
		<section
			className="bg-modal-bg duration-300 ease-in-out fixed h-full text-black left-0 top-0 transition-all w-full z-10"
			onClick={closeInvitationModal}>
			<div
				className="bg-gray-100 border border-gray-400 flex flex-col mx-auto my-modal-margin rounded-lg shadow-md min-w-min w-3/4 max-w-max"
				onClick={(e) => e.stopPropagation()}>
				<Tabs
					tabs={tabData}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					closeModal={closeInvitationModal}
				/>
			</div>
		</section>
	);
};

export default InviteMemberModal;
