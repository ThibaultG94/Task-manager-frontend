import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserContacts } from '../../../store/selectors/userSelectors';
import { selectWorkspaces } from '../../../store/selectors/workspaceSelectors';
import { useSendInvitationWorkspace } from '../../../api/workspaceInvitations/useSendInvitationWorkspace';
import ArrowDown from '../../Buttons/ArrowDown';
import LoadingCreateComponent from '../../Buttons/LoadingCreateComponent';
import SubmitButton from '../../ModalForm/SubmitButton';
import { toast } from 'react-toastify';

const SendWorkspaceInviteForm = ({ userId }) => {
    const contacts = useSelector(selectUserContacts);
    const userWorkspaces = useSelector(selectWorkspaces);

    const sendInvitationWorkspace = useSendInvitationWorkspace();

    const [selectedMember, setSelectedMember] = useState([]);
    const [selectedWorkspaceId, setSelectedWorkspaceId] = useState('default');
    const [filteredContacts, setFilteredContacts] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const invitation = {
            userId,
            contactId: selectedMember,
            role: 'member',
            workspaceId: selectedWorkspaceId,
        }

        setIsLoading(true);
        await sendInvitationWorkspace(invitation);
        setIsLoading(false);
        toast.success('Invitation envoyée !');
    };

    useEffect(() => {
        setSelectedMember('default');
        if (contacts) setFilteredContacts(contacts);
    }, [userId]);

    useEffect(() => {
        if (selectedWorkspaceId === 'default' || !selectedWorkspaceId) {
            setFilteredContacts(contacts);
        } else {
            const workspace = userWorkspaces.find(ws => ws._id === selectedWorkspaceId);
            if (workspace) {
                let filtered = [];
                contacts.forEach(contact => {
                    const isMember = workspace.members.some(member => member.userId == contact.id);
                    const isInvited = workspace.invitationStatus?.some(invite => invite.userId == contact.id);
                    if (!isMember && !isInvited) {
                        filtered.push(contact);
                    }
                });
                setFilteredContacts(filtered);
            } else {
                setFilteredContacts(contacts);
            }
        }
    }, [selectedWorkspaceId]);
    
    return (
        <div id="tab-content2" className="mt-4">
            <h2 className="text-dark-blue mb-4 text-xl sm:text-2xl text-center">
                Inviter un contact à un Workspace
            </h2>
            <form className="mx-auto mb-9 flex flex-col" onSubmit={handleSubmit}>
                <div className="flex justify-center items-center flex-col md:flex-row mb-1 md:mb-2">
                    <div className="mb-2 md:mb-0 md:mr-2 relative w-2/6">
                        <select
                            className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 cursor-pointer focus:outline-none focus:shadow-outline leading-tight pr-8 px-4 py-2 rounded shadow w-full"
                            name="workspaceId"
                            onChange={(e) => setSelectedWorkspaceId(e.target.value)}
                            required
                            value={selectedWorkspaceId}>
                            <option value="default" disabled>
                                Sélectionnez un workspace
                            </option>
                            {userWorkspaces.map(workspace => (
                                <option key={workspace._id} value={workspace._id}>
                                    {workspace.title}
                                </option>
                            ))}
                        </select>
                        <ArrowDown />
                    </div>
                    <div className="relative mb-4 md:mr-4 md:mb-0">
                        <select
                            className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 cursor-pointer focus:outline-none focus:shadow-outline leading-tight pr-8 pl-2 py-2 rounded shadow"
                            id="assignedTo"
                            name="assignedTo"
                            onChange={(e) => setSelectedMember(e.target.value)}
                            value={selectedMember}>
                            <option value="default" disabled>
                                Sélectionnez un membre
                            </option>
                            {filteredContacts && filteredContacts.map(member => (
                                <option key={member.id} value={member.id}>
                                    {member.username}
                                </option>
                            ))}
                        </select>
                        <ArrowDown />
                    </div>
                </div>
                <div className='flex justify-end px-8'>
                    {isLoading ? (
                        <LoadingCreateComponent />
                    ) : (
                        <SubmitButton label={"Envoyer l'invitation"} />
                    )}
                </div>
            </form>
        </div>
    );
};

export default SendWorkspaceInviteForm;
