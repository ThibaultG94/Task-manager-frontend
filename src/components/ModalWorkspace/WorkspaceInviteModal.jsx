import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { useEditWorkspace } from '../../api/workspaces/useEditWorkspace';
import { toast } from 'react-toastify';

const WorkspaceInviteModal = ({ contactId, closeModal, position, userContacts }) => {
    const userWorkspaces = useSelector(selectWorkspaces);

    const editWorkspace = useEditWorkspace();

    const [workspaces, setWorkspaces] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState('');
    const [contactName, setContactName] = useState('');
    const [isClosing, setIsClosing] = useState(false);

    const [modalStyle, setModalStyle] = useState({
        position: 'fixed',
        left: `${position.x - 32}px`,
        top: `${position.y}px`,
        transform: 'translateX(-100%)',
        width: '24rem',
        animation: 'slideRightToLeft 0.2s forwards'
    });

    const isSmallScreen = window.innerWidth < 450;

    const closeHandler = () => {
        setIsClosing(true);
        setTimeout(() => {
            closeModal();
        }, 300);
    };

    const handleInvite = async () => {
        const workspace = userWorkspaces.find(ws => ws._id === selectedWorkspace);
        const editedWorkspace = {
            ...workspace,
            members: [
                ...workspace.members,
                {
                    userId: contactId,
                    role: 'member'
                }
            ]
        };
        await editWorkspace(editedWorkspace);
        toast.success("Le contact a bien reçu l'invitation !");
        closeModal();
    };

    useEffect(() => {
        if (isClosing) {
            setModalStyle({...modalStyle, animation: 'slideLeftToRight 0.2s forwards'})
        } else {
            setModalStyle({...modalStyle, animation: 'slideRightToLeft 0.2s forwards'})
        }
    }, [isClosing]);

    useEffect(() => {
        const newStyle = {...modalStyle};
        if (window.innerWidth < 450) {
            newStyle.width = '16rem';
        }
        setModalStyle(newStyle);
    }, [isSmallScreen]);

    useEffect(() => {
        const fetchAvailableWorkspaces = async () => {
            const user = userContacts.find(contact => contact.id === contactId);
            setContactName(user.username);
            let filtered = [];
            userWorkspaces.forEach(workspace => {
                const isDefault = workspace.isDefault === "true" ? true : false;
                const isMember = workspace.members.some(member => member.userId == contactId);
                const isInvited = workspace.invitationStatus?.some(invite => invite.userId == contactId);
                if (!isDefault && !isMember && !isInvited) {
                    filtered.push(workspace);
                }
            });
            setWorkspaces(filtered);
        };

        fetchAvailableWorkspaces();
    }, [contactId]);

    return (
        <div style={modalStyle}>
            <div className="bg-modal-task-bg p-4 rounded-lg shadow-lg">
                <div className="absolute right-2 top-2">
                    <button onClick={closeHandler} className="text-gray-400 hover:text-gray-600">
                        <i className="fa fa-times fa-lg"></i>
                    </button>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Inviter {contactName} dans un Workspace</h2>
                <select
                className="mt-4 p-2 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:dark-blue"
                value={selectedWorkspace}
                onChange={e => setSelectedWorkspace(e.target.value)}>
                    <option value="">Sélectionner un Workspace</option>
                     {workspaces.map(ws => (
                     <option  option key={ws._id} value={ws._id}>{ws.title}</option>
                    ))
                }
                </select>
                <div className="flex justify-end mt-6">
                    <button className="text-light-blue-2 hover:text-dark-blue" onClick={handleInvite}>
                     <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceInviteModal;