import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';

const ListWorkspaces = () => {
	const workspaces = useSelector(selectWorkspaces);
	const [displayWorkspaces, setDisplayWorkspaces] = useState([]);

	useEffect(() => {
		const updateDisplayWorkspaces = () => {
			const updatedWorkspaces = [];
			for (let i = 0; i < 6; i++) {
				if (workspaces && workspaces[i]) {
					updatedWorkspaces.push({
						title: workspaces[i].title,
						members: workspaces[i].members,
					});
				}
			}
			setDisplayWorkspaces(updatedWorkspaces);
		};

		updateDisplayWorkspaces();
	}, [workspaces]);

	return (
		<div className="workspaces-container dashboard-card">
			<h4>Workspaces</h4>
			<div className="h-[80%] flex flex-col justify-between">
				{displayWorkspaces.map((workspace, index) => (
					<div
						key={index}
						className="flex p-2 items-center justify-between"
						style={{ opacity: workspace ? '1' : '0' }}>
						<div className="flex">
							<div className="mr-3">
								<i className="fa-solid fa-share-nodes"></i>
							</div>
							<div>{workspace.title}</div>
							{/* <div>
								{workspace.members.map((member) => (
									<span>{member[0]}</span>
								))}
							</div> */}
						</div>
						<div>
							<div>{workspace.coworkersCount}</div>
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
