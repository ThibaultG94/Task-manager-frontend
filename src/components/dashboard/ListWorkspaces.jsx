import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { useGetWorkspaceTaskStatusCount } from '../../api/getWorkspaceTaskStatusCount';
import { TaskStatusCount } from './TaskStatusCount';
import { useMediaQuery } from 'react-responsive';
import {
	FaUser,
	FaClipboardList,
	FaCheck,
	FaArchive,
	FaSpinner,
} from 'react-icons/fa';
import { TaskStatusIcon } from './TaskStatusIcon';
import useCheckIfEditedWorkspace from './utils/checkIfEditedWorkspace';
import { formatWorkspaceForEditing } from '../workspaces/utils/formatWorkspaceForEditing';
import { setInitialEditedWorkspace } from '../../store/feature/workspaces.slice';
import HandleModalWorkspace from '../workspaces/HandleModalWorkspace';

const ListWorkspaces = () => {
	const workspaces = useSelector(selectWorkspaces);
	const [allWorkspaces, setAllWorkspaces] = useState([]);
	const [displayWorkspaces, setDisplayWorkspaces] = useState([]);
	const getWorkspaceTaskStatusCount = useGetWorkspaceTaskStatusCount();
	const isTabletOrLaptop = useMediaQuery({ maxWidth: 1024 });
	const [selectedWorkspace, setSelectedWorkspace] = useState(null);
	const [isModalWorkspaceOpen, setIsModalWorkspaceOpen] = useState(false);
	const [isEditingWorkspace, setIsEditingWorkspace] = useState(false);

	const statusToIcon = {
		Pending: <FaClipboardList />,
		'In Progress': <FaSpinner />,
		Completed: <FaCheck />,
		Archived: <FaArchive />,
	};

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
		const resetEditedWorkspace = async () => {
			// const formattedWorkspace = await formatWorkspaceForEditing(
			// 	selectedWorkspace
			// );
			// if (formattedWorkspace) {
			// 	dispatch(setInitialEditedWorkspace(formattedWorkspace));
			// }
		};
		resetEditedWorkspace();
	}, [selectedWorkspace]);

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
			<div className="flex flex-col">
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
									<div className="bg-dark-blue cursor-auto flex h-8 items-center justify-center mx-auto overflow-hidden p-1.5 px-2.5 relative rounded-full text-left w-8">
										{workspace?.membersName.map(
											(member, index) => (
												<span
													id="avatarLetterAssigned"
													key={index}>
													{member[0]}
												</span>
											)
										)}
									</div>
									<div className="ml-4">
										<FaUser
											title={`${workspace?.members.length} membre(s)`}
										/>
									</div>
									<div className="hidden sm:flex text-center">
										{workspace?.taskStatusCount &&
											Object.entries(
												workspace?.taskStatusCount
											)
												.filter(
													([, count]) => count > 0
												)
												.map(([status, count]) => (
													<TaskStatusIcon
														key={status}
														status={status}
														count={count}
													/>
												))}
									</div>
								</div>
							) : (
								<div className="flex items-center">
									<div className="bg-dark-blue cursor-auto flex h-8 items-center justify-center mx-auto overflow-hidden p-1.5 px-2.5 relative rounded-full text-left w-8">
										{workspace?.membersName.map(
											(member, index) => (
												<span
													id="avatarLetterAssigned"
													key={index}>
													{member[0]}
												</span>
											)
										)}
									</div>
									<div className="ml-4">
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
												.filter(
													([, count]) => count > 0
												)
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
					<div className="noWorkspace">
						Vous n'avez aucun espace de travail actuellement
					</div>
				)}
			</div>

			{isModalWorkspaceOpen && (
				<HandleModalWorkspace
					closeModalWorkspace={closeModalWorkspace}
					setIsModalWorkspaceOpen={setIsModalWorkspaceOpen}
					isEditingWorkspace={isEditingWorkspace}
					setIsEditingWorkspace={setIsEditingWorkspace}
					selectedWorkspace={selectedWorkspace}
				/>
			)}
		</div>
	);
};

export default ListWorkspaces;
