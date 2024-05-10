import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import CloseButton from '../Buttons/CloseButton';
import BlockContact from './BlockContact';
import DeleteContact from './HandleDeleteContact';

const HandleModalContact = ({ closeModal, selectedContact }) => {
    const userWorkspaces = useSelector(selectWorkspaces);

    const [workspaces, setWorkspaces] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [isClosing, setIsClosing] = useState(false);

    const modalRef = useRef(null);

    useEffect(() => {
        const filterWorkspaces = () => {
            let filteredWorkspaces = userWorkspaces.filter(workspace =>
                workspace.members.some(member => member.userId === selectedContact.id));
    
            setWorkspaces(filteredWorkspaces);
        };
    
        filterWorkspaces();
    }, [userWorkspaces, selectedContact.id]);

    const closeHandler = () => {
        setIsClosing(true);
        setTimeout(() => {
            closeModal();
        }, 300);
    };

    useEffect(() => {
        const currentModal = modalRef.current;
        if (currentModal) {
            currentModal.style.animation = `${isClosing ? 'slideOut' : 'slideIn'} 0.3s forwards`;
        }
    }, [isClosing]);

    return (
        <section
			className="bg-black bg-opacity-50 fixed h-full inset-0 w-full z-10"
			onClick={closeHandler}>
			<div
				className="flex flex-col bg-white fixed left-1/2 max-h-[85vh] max-w-lg overflow-hidden transform -translate-x-1/2 top-20 rounded-lg shadow-md w-modal-xs custom-xs:w-modal-sm md:w-modal-md lg:w-modal-lg xl:w-modal-xl z-10"
				ref={modalRef}
				onClick={(e) => e.stopPropagation()}>
				<div className="flex-grow overflow-y-auto">
					<CloseButton
						onClose={closeHandler}
						modalTabs={false}
					/>
                    <div className="max-w-lg mx-auto px-6 rounded-lg">
                        <div className="text-center pt-4 px-6 mb-4">
                            <h5 className="text-gray-900 text-lg md:text-xl leading-tight font-medium mb-2">
                                {selectedContact?.username}
                            </h5>
                        </div>

                        <div className="mb-4 text-base text-gray-700 px-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold self-end text-gray-500 pb-0.5">
                                    Email
                                </span>
                                <div
                                    className="email-icon px-2 py-1 rounded-lg bg-light-blue">
                                    <span
                                        className={`text-sm font-semibold px-2 rounded`}>
                                        {selectedContact?.email}
                                    </span>
                                </div>
                            </div>

                            {workspaces && workspaces.length > 0 && (
                                <div className="flex flex-wrap justify-between items-center py-1">
                                    <span className="text-sm font-bold self-end text-gray-500">
                                        Workspaces
                                    </span>
                                    {workspaces && workspaces.map((workspace) => (
                                        <div className="workspace-icon mt-2 ml-6 px-2 py-1 rounded-lg bg-light-blue-3" key={workspace._id}>
                                            <span className="ml-2 text-sm">{workspace?.title} </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {tasks && tasks.length > 0 && (
                                <div className="flex flex-wrap justify-between items-center py-1">
                                    <span className="text-sm font-bold self-end text-gray-500">
                                        Tâches
                                    </span>
                                        {tasks && tasks.map((task) => (
                                             <div className="task-icon mt-2 ml-6 px-2 py-1 rounded-lg bg-light-blue-3" key={task._id}>
                                                    <span className="ml-2 text-sm">{task?.title} </span>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
				</div>

                <div className="absolute left-0 top-0 p-4">
                    <div className="w-10 flex justify-between items-center">
                        {/* <BlockContact /> */}
                        <DeleteContact closeModal={closeModal} selectedContact={selectedContact} />
                    </div>
                </div>

                <div className="absolute left-0 bottom-0 p-4">
					
				</div>
			</div>
		</section>
    );
};

export default HandleModalContact;