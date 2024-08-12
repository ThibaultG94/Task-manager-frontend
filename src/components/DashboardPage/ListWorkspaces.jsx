import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { selectIsWorkspacesLoaded, selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import useCheckIfEditedWorkspace from '../../utils/useCheckIfEditedWorkspace';
import { TaskStatusCount } from '../ModalTask/TaskStatusCount';
import { TaskStatusIcon } from '../ModalTask/TaskStatusIcon';
import { FaUser } from 'react-icons/fa';
import HandleModalWorkspace from '../ModalWorkspace/HandleModalWorkspace';
import LoadingComponent from '../Buttons/LoadingComponent';
import AvatarContact from '../Cloudinary/AvatarContact';

const ListWorkspaces = ({ userId }) => {
	const isTabletOrLaptop = useMediaQuery({ maxWidth: 1024 });
	const workspaces = useSelector(selectWorkspaces);
	const isWorkspacesLoaded = useSelector(selectIsWorkspacesLoaded);

	const [allWorkspaces, setAllWorkspaces] = useState([]);
	const [displayWorkspaces, setDisplayWorkspaces] = useState([]);
	const [selectedWorkspace, setSelectedWorkspace] = useState(null);
	const [isModalWorkspaceOpen, setIsModalWorkspaceOpen] = useState(false);
	const [isEditingWorkspace, setIsEditingWorkspace] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const statusOrder = ['Pending', 'In Progress', 'Completed', 'Archived'];

	const checkIfEditedWorkspace = useCheckIfEditedWorkspace({
		setIsModalWorkspaceOpen,
		setIsEditingWorkspace,
		selectedWorkspace,
	});

	const openModalWorkspace = (e) => {
		e.stopPropagation();
		setIsModalWorkspaceOpen(true);
	};

	const closeModalWorkspace = async () => {
		await checkIfEditedWorkspace();
	};

	useEffect(() => {
		if (!isWorkspacesLoaded) setIsLoading(true);
		else setIsLoading(false);
	}, [isWorkspacesLoaded]);

	useEffect(() => {
		setAllWorkspaces(workspaces);
	}, [workspaces]);

	useEffect(() => {
		const updateDisplayWorkspaces = async () => {
			const updatedWorkspaces = [];
			for (let i = 0; i < 6; i++) {
				if (allWorkspaces && allWorkspaces[i]) {
					const members = allWorkspaces[i].members;
					const membersName = members.map((user) => user?.username);

					updatedWorkspaces.push({
						title: allWorkspaces[i].title,
						members: allWorkspaces[i].members,
						membersName: membersName,
						taskStatusCount: allWorkspaces[i].taskStatusCounts,
						workspaceId: allWorkspaces[i]._id,
						description: allWorkspaces[i].description,
						invitationStatus: allWorkspaces[i].invitationStatus
							? allWorkspaces[i].invitationStatus
							: null,
						isDefault: allWorkspaces[i].isDefault,
					});
				}
			}
			setDisplayWorkspaces(updatedWorkspaces);
		};

		if (allWorkspaces) updateDisplayWorkspaces();
	}, [allWorkspaces]);

	const renderMembers = (members) => {
		const maxMembersToShow = 3;
		const extraMembers = members.length - maxMembersToShow;

		return (
			<div className="sm:flex items-center hidden">
				{members.slice(0, maxMembersToShow).map((member, index) => (
					<div className="bg-dark-blue-2 h-9 w-9 flex items-center justify-center mx-auto relative rounded-full text-left mr-2" key={index}>
						<AvatarContact user={member} />
					</div>
				))}
				{extraMembers > 0 && (
					<div className="bg-light-blue flex h-9 items-center justify-center mx-auto p-1.5 px-2.5 relative rounded-full text-left w-9 mr-2">
						<span className="text-blue-950">
							+{extraMembers}
						</span>
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="dashboard-card workspaces-container">
			<h4 className="pl-4">Workspaces</h4>
			{isLoading ? (
				<LoadingComponent />
			) : (
				<div className="flex flex-col h-full pl-2 md:pl-0">
					{displayWorkspaces &&
						displayWorkspaces.map((workspace, index) => (
							<div
								className="workspace p-0.5 md:p-1.5"
								key={index + 1465565}
								onClick={(e) => {
									openModalWorkspace(e);
									setSelectedWorkspace(workspace);
								}}
								style={{ opacity: workspace ? '1' : '0' }}>
								<div className="flex h-8 items-center ellipsis">
									<div className="mr-2 md:mr-3 text-dark-blue text-sm sm:text-base md:text-lg">
										<i className="fa-solid fa-share-nodes"></i>
									</div>
									<div className="text-sm md:text-base max-w-60 pr-4 ellipsis">
										{workspace?.title}
									</div>
								</div>
								{isTabletOrLaptop ? (
									<div className="flex items-center">
										{renderMembers(workspace?.members)}
										<div className="ml-2 mr-2 hidden sm:block">
											<FaUser
												title={`${workspace?.members.length} membre(s)`}
											/>
										</div>
										<div className="hidden sm:flex text-center">
											{workspace?.taskStatusCount &&
												Object.entries(
													workspace?.taskStatusCount
												)
												.filter(([, count]) => count > 0)
												.sort((a, b) => statusOrder.indexOf(a[0]) - statusOrder.indexOf(b[0]))
												.map(([status, count]) => (
													<TaskStatusIcon
														key={status}
														status={status}
														count={count}
													/>
												))
											}
										</div>
									</div>
								) : (
									<div className="flex items-center">
										{renderMembers(workspace?.members)}
										<div className="ml-2">
											<span className="bg-light-blue mr-2 px-2.5 py-1 rounded text-xs">
												{workspace?.members.length}{' '}
												{workspace?.members.length > 1
													? 'membres'
													: 'membre'}
											</span>
										</div>
										<div className="ml-2">
											{workspace?.taskStatusCount &&
												Object.entries(
													workspace?.taskStatusCount
												)
												.filter(([, count]) => count > 0)
												.sort((a, b) => statusOrder.indexOf(a[0]) - statusOrder.indexOf(b[0]))
												.map(([status, count]) => (
													<TaskStatusCount
														key={status}
														status={status}
														count={count}
													/>
											))}
										</div>
									</div>
								)}
							</div>
						))}
					{displayWorkspaces.length === 0 && (
						<div className="no-urgent-tasks">
							<span>
								Vous n'avez aucun espace de travail actuellement
							</span>
						</div>
					)}
				</div>
			)}

			{isModalWorkspaceOpen && (
				<HandleModalWorkspace
					closeModalWorkspace={closeModalWorkspace}
					setIsModalWorkspaceOpen={setIsModalWorkspaceOpen}
					isEditingWorkspace={isEditingWorkspace}
					setIsEditingWorkspace={setIsEditingWorkspace}
					selectedWorkspace={selectedWorkspace}
					userId={userId}
					isModalWorkspaceOpen={isModalWorkspaceOpen}
				/>
			)}
		</div>
	);
};

export default ListWorkspaces;
