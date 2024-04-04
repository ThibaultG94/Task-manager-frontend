import React, { useEffect } from 'react';
import ArrowDown from '../Buttons/ArrowDown';

const MemberSelect = ({
	selectedMember,
	setSelectedMember,
	workspaceMembers,
}) => {
	useEffect(() => {
		if (workspaceMembers && workspaceMembers.length === 1) {
			setSelectedMember(workspaceMembers[0].userId);
		}
		console.log('workspaceMembers', workspaceMembers);
		console.log(selectedMember);
	}, [workspaceMembers, setSelectedMember]);

	return (
		<div className="md:mr-2 relative w-full md:w-1/2">
			<select
				className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 cursor-pointer focus:outline-none focus:shadow-outline leading-tight pr-8 px-4 py-2 rounded shadow w-full"
				id="assignedTo"
				name="assignedTo"
				onChange={(e) => setSelectedMember(e.target.value)}
				value={selectedMember}>
				<option value="default" disabled>
					Sélectionnez un membre
				</option>
				{workspaceMembers &&
					workspaceMembers.map((member) => (
						<option key={member.userId} value={member.userId}>
							{member.username}
						</option>
					))}
			</select>
			<ArrowDown />
		</div>
	);
};

export default MemberSelect;
