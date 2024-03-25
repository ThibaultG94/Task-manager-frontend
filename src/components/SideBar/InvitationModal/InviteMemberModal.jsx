import React, { useState } from 'react';
import Tabs from '../../ModalForm/Tabs';
import SendInviteForm from './SendInviteForm';
import SentOutInvitations from './SentOutInvitations';
import ReceivedInvitesList from './ReceivedInvitesList';

const InviteMemberModal = ({ userId, setIsInvitationModalOpen, tab }) => {
	const [activeTab, setActiveTab] = useState(tab);
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
				className="bg-white border border-gray-400 flex flex-col mx-auto my-modal-margin rounded-lg shadow-md min-w-72 sm:min-w-96 w-3/4 max-w-max"
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
