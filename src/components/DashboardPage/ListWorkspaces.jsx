import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { selectIsWorkspacesLoaded, selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { useGetWorkspaceTaskStatusCount } from '../../api/tasks/useGetWorkspaceTaskStatusCount';
import useCheckIfEditedWorkspace from '../../utils/useCheckIfEditedWorkspace';
import { TaskStatusCount } from '../ModalTask/TaskStatusCount';
import { TaskStatusIcon } from '../ModalTask/TaskStatusIcon';
import { FaUser } from 'react-icons/fa';
import HandleModalWorkspace from '../ModalWorkspace/HandleModalWorkspace';
import LoadingComponent from '../Buttons/LoadingComponent';

const ListWorkspaces = ({ userId }) => {
	const isTabletOrLaptop = useMediaQuery({ maxWidth: 1024 });
	const workspaces = useSelector(selectWorkspaces);
	const isWorkspacesLoaded = useSelector(selectIsWorkspacesLoaded);

	const getWorkspaceTaskStatusCount = useGetWorkspaceTaskStatusCount();

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
					const taskStatusCount = await getWorkspaceTaskStatusCount(
						allWorkspaces[i]._id
					);

					updatedWorkspaces.push({
						title: allWorkspaces[i].title,
						members: allWorkspaces[i].members,
						membersName: membersName,
						taskStatusCount: taskStatusCount,
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
								className="workspace p-1 md:p-2"
								key={index}
								onClick={(e) => {
									openModalWorkspace(e);
									setSelectedWorkspace(workspace);
								}}
								style={{ opacity: workspace ? '1' : '0' }}>
								<div className="flex h-8 items-center">
									<div className="mr-2 md:mr-3 text-dark-blue text-sm sm:text-base md:text-lg">
										<i className="fa-solid fa-share-nodes"></i>
									</div>
									<div className="text-sm md:text-base">
										{workspace?.title}
									</div>
								</div>
								{isTabletOrLaptop ? (
									<div className="flex items-center">
										{workspace?.membersName.map(
											(member, index) => (
												<div className="bg-dark-blue cursor-auto flex h-8 items-center justify-center mx-auto overflow-hidden p-1.5 px-2.5 relative rounded-full text-left w-8 mr-2">
													<span
														id="avatarLetterAssigned"
														key={index + 1000}>
														{member && member[0]}
													</span>
												</div>
											)
										)}
										<div className="ml-2 mr-2">
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
										{workspace?.membersName.map(
											(member, index) => (
												<div
													className="bg-dark-blue cursor-auto flex h-8 items-center justify-center mx-auto overflow-hidden p-1.5 px-2.5 relative rounded-full text-left w-8 mr-2"
													key={index}>
													<span
														id="avatarLetterAssigned"
														key={index}>
														{member && member[0]}
													</span>
												</div>
											)
										)}
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
						<div className="h-full flex items-center justify-center">
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
