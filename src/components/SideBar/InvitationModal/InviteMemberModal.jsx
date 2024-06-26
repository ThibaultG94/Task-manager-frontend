import React, { useEffect, useRef, useState } from 'react';
import Tabs from '../../ModalForm/Tabs';
import SendInviteForm from './SendInviteForm';
import SentOutInvitations from './SentOutInvitations';
import ReceivedInvitesList from './ReceivedInvitesList';
import ListContacts from './ListContacts';
import ListBlockedContacts from './ListBlockedContact';

const InviteMemberModal = ({ userId, setIsInvitationModalOpen, tab }) => {
	const modalInvitRef = useRef(null);

	const [activeTab, setActiveTab] = useState(tab);
	const [isClosing, setIsClosing] = useState(false);

	const tabData = [
		{
			id: 'tab1',
			label: 'Liste des contacts',
			icon: 'fas fa-address-book',
			component: <ListContacts userId={userId} />,
		},
		{
			id: 'tab2',
			label: 'Ajouter un contact',
			icon: 'fas fa-user-plus',
			component: <SendInviteForm userId={userId} />,
		},
		{
			id: 'tab3',
			label: 'Invitations Envoyées',
			icon: 'fas fa-paper-plane',
			component: <SentOutInvitations />,
		},
		{
			id: 'tab4',
			label: 'Invitations Reçues',
			icon: 'fas fa-envelope-open',
			component: <ReceivedInvitesList userId={userId} />,
		},
		{
			id: 'tab5',
			label: 'Liste des contacts bloqués',
			icon: 'fa-solid fa-user-slash',
			component: <ListBlockedContacts userId={userId} />,
		},
	];

	const closeInvitationModal = () => {
		setIsInvitationModalOpen(false);
	};

	const closeHandler = () => {
        setIsClosing(true);
        setTimeout(() => {
            closeInvitationModal();
        }, 300);
    };

    useEffect(() => {
        const currentModal = modalInvitRef.current;
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
				onClick={(e) => e.stopPropagation()} ref={modalInvitRef}>
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

export default InviteMemberModal;
