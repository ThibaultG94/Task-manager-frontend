import React from 'react';
import ArrowDown from './ArrowDown';

const WorkspaceSelect = ({
	selectedWorkspace,
	setSelectedWorkspace,
	userWorkspaces,
}) => {
	return (
		<div className="relative w-1/2 mr-2">
			<select
				name="workspaceId"
				value={selectedWorkspace}
				className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
				onChange={(e) => setSelectedWorkspace(e.target.value)}>
				<option value="default" disabled>
					Sélectionnez un workspace
				</option>
				{userWorkspaces &&
					userWorkspaces.map((workspace) => (
						<option key={workspace._id} value={workspace._id}>
							{workspace.title}
						</option>
					))}
			</select>
			<ArrowDown />
		</div>
	);
};

export default WorkspaceSelect;
