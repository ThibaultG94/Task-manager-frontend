import React from 'react';
import ArrowDown from '../Buttons/ArrowDown';

const WorkspaceSelect = ({
	selectedWorkspace,
	setSelectedWorkspace,
	userWorkspaces,
}) => {
	return (
		<div className="mb-2 md:mb-0 md:mr-2 relative w-full md:w-1/2">
			<select
				className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 cursor-pointer focus:outline-none focus:shadow-outline leading-tight pr-8 px-4 py-2 rounded shadow w-full"
				name="workspaceId"
				onChange={(e) => setSelectedWorkspace(e.target.value)}
				required
				value={selectedWorkspace}>
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
