import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { useGetSentOutInvitations } from '../../api/invitations/useGetSentOutInvitations';
import { useGetReceivedInvitations } from '../../api/invitations/useGetReceivedInvitations';
import { useGetSentOutWorkspaceInvitations } from '../../api/workspaceInvitations/useGetSentOutWorkspaceInvitations';
import { useGetReceivedWorkspaceInvitations } from '../../api/workspaceInvitations/useGetReceivedWorkspaceInvitations';
import CreateTaskAndWorkspace from './ModalTaskAndWorkspace/CreateTaskAndWorkspace';
import InviteMemberModal from './InvitationModal/InviteMemberModal';

import WorkspaceManageModal from '../workspaces/WorkspaceManageModal';

const Navigation = ({ userId }) => {
	const location = useLocation();

	const getSentOutInvitations = useGetSentOutInvitations();
	const getReceivedInvitations = useGetReceivedInvitations();
	const getSendOutWorkspaceInvitations = useGetSentOutWorkspaceInvitations();
	const getReceivedWorkspaceInvitations =
		useGetReceivedWorkspaceInvitations();

	const [
		isCreateTaskOrWorkspaceModalOpen,
		setIsCreateTaskOrWorkspaceModalOpen,
	] = useState(false);
	const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
	const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
	const classIcone = 'cursor-pointer text-xl xl:mb-6 mr-6 xl:mr-0';
	const classIconeActive =
		'cursor-pointer text-xl xl:mb-6 mr-6 xl:mr-0 font-bold text-orange-primary';

	const isActiveLink = (paths) => {
		return paths.includes(location.pathname);
	};

	useEffect(() => {
		const getDatas = async () => {
			getSentOutInvitations(userId);
			getReceivedInvitations(userId);
		};
		if (userId) getDatas();
	}, [isInvitationModalOpen]);

	useEffect(() => {
		const getDatas = async () => {
			getSendOutWorkspaceInvitations(userId);
			getReceivedWorkspaceInvitations(userId);
		};
		if (userId) getDatas();
	}, [isWorkspaceModalOpen]);

	return (
		<nav className="flex flex-row xl:flex-col justify-between self-center xl:self-end xl:w-full">
			<NavLink
				id="homelink"
				to="/pages/dashboard"
				className={() =>
					isActiveLink([
						'/pages/dashboard',
						'/pages/tasks',
						'/pages/workspaces',
					]) &&
					!isCreateTaskOrWorkspaceModalOpen &&
					!isInvitationModalOpen
						? classIconeActive
						: classIcone
				}>
				<li
					data-tooltip-class-name="text-xs font-normal"
					data-tooltip-content="Dashboard"
					data-tooltip-id="icon-home"
					data-tooltip-variant="info">
					<i className="fas fa-home mr-1"></i>
				</li>
				<Tooltip id="icon-home" place="top" />
			</NavLink>

			<NavLink
				id="calendarlink"
				to="/pages/calendar"
				className={(nav) =>
					nav.isActive ? classIconeActive : classIcone
				}
				style={{ display: 'none' }}>
				<li>
					<i className="fas fa-calendar-alt mr-1"></i>
				</li>
			</NavLink>

			<NavLink
				id="overviewlink"
				to="/pages/overview"
				className={(nav) =>
					nav.isActive ? classIconeActive : classIcone
				}
				style={{ display: 'none' }}>
				<li>
					<i className="fas fa-eye mr-1"></i>
				</li>
			</NavLink>

			<li
				className={
					isCreateTaskOrWorkspaceModalOpen
						? classIconeActive
						: classIcone
				}
				data-tooltip-content="Créer une tâche ou un workspace"
				data-tooltip-id="icon-create"
				data-tooltip-variant="info"
				id="addWorkspaceOrTaskButton"
				onClick={() => setIsCreateTaskOrWorkspaceModalOpen(true)}>
				<i className="fas fa-plus-square mr-1"></i>
			</li>

			<li
				className={
					isInvitationModalOpen ? classIconeActive : classIcone
				}
				data-tooltip-content="Ajouter un contact"
				data-tooltip-id="icon-plus"
				data-tooltip-variant="info"
				onClick={() => setIsInvitationModalOpen(true)}>
				<i className="fa-solid fa-user-plus"></i>
			</li>
			<Tooltip id="icon-create" place="right" />
			<Tooltip id="icon-plus" place="right" />
			<Tooltip id="icon-workspace" place="bottom" />

			<li
				className={isWorkspaceModalOpen ? classIconeActive : classIcone}
				data-tooltip-content="Gérer les workspaces"
				data-tooltip-id="icon-workspace"
				data-tooltip-variant="info"
				onClick={() => setIsWorkspaceModalOpen(true)}>
				<i className="fa-solid fa-briefcase mr-1"></i>
			</li>

			{isCreateTaskOrWorkspaceModalOpen && (
				<CreateTaskAndWorkspace
					userId={userId}
					setIsCreateTaskOrWorkspaceModalOpen={
						setIsCreateTaskOrWorkspaceModalOpen
					}
				/>
			)}

			{isInvitationModalOpen && (
				<InviteMemberModal
					userId={userId}
					setIsInvitationModalOpen={setIsInvitationModalOpen}
					tab={'tab1'}
				/>
			)}

			{isWorkspaceModalOpen && (
				<WorkspaceManageModal
					userId={userId}
					setIsWorkspaceModalOpen={setIsWorkspaceModalOpen}
					tab={'tab1'}
				/>
			)}
		</nav>
	);
};

export default Navigation;
