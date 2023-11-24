import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { useGetUser } from '../../api/getUser';

const ListWorkspaces = () => {
	const workspaces = useSelector(selectWorkspaces);
	const [displayWorkspaces, setDisplayWorkspaces] = useState([]);
	const getUser = useGetUser();

	useEffect(() => {
		const updateDisplayWorkspaces = async () => {
			const updatedWorkspaces = [];
			for (let i = 0; i < 6; i++) {
				if (workspaces && workspaces[i]) {
					const membersPromises = workspaces[i].members.map(
						(member) => getUser(member)
					);
					const members = await Promise.all(membersPromises);
					const membersName = members.map((user) => user?.username);

					updatedWorkspaces.push({
						title: workspaces[i].title,
						members: workspaces[i].members,
						membersName: membersName,
					});
				}
			}
			setDisplayWorkspaces(updatedWorkspaces);
		};

		updateDisplayWorkspaces();
	}, [workspaces]);

	return (
		<div className="dashboard-card workspaces-container">
			<h4 className="pl-1">Workspaces</h4>
			<div className="flex flex-col">
				{displayWorkspaces &&
					displayWorkspaces.map((workspace, index) => (
						<div
							key={index}
							className="flex items-center justify-between p-2 relative"
							style={{ opacity: workspace ? '1' : '0' }}>
							<div className="flex h-8 items-center">
								<div className="mr-3 text-dark-blue text-lg">
									<i className="fa-solid fa-share-nodes"></i>
								</div>
								<div>{workspace?.title}</div>
							</div>
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
									<span className="bg-dark-purple font-semibold mr-2 px-2.5 py-0.5 rounded text-white text-xs">
										{workspace?.members.length}
									</span>
								</div>
							</div>
						</div>
					))}
				{displayWorkspaces.length === 0 && (
					<div className="noWorkspace">
						Vous n'avez aucun espace de travail actuellement
					</div>
				)}
			</div>
		</div>
	);
};

export default ListWorkspaces;
