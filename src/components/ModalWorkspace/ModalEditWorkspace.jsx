import React from 'react';
import ContactsSelect from '../ModalForm/ContactsSelect';

const ModalEditWorkspace = ({
	contacts,
	selectedMembers,
	setSelectedMembers,
	workspaceDataChange,
	setWorkspaceDataChange,
}) => {
	const handleSelectedMembersChange = (newSelectedMembers) => {
		setSelectedMembers(
			newSelectedMembers.map((option) => ({
				id: option.value,
				username: option.label,
			}))
		);
	};
	// const handleChange = (optionSelected, { action, removedValue }) => {
	// 	switch (action) {
	// 		case 'remove-value':
	// 			// Traitement pour la suppression d'un membre
	// 			const newSelectedMembers = selectedMembers.filter(
	// 				(member) => member.id !== removedValue.value
	// 			);
	// 			setSelectedMembers(newSelectedMembers);
	// 			break;
	// 		case 'select-option':
	// 			// Traitement pour l'ajout d'un nouveau membre
	// 			const newMember = {
	// 				id: optionSelected[optionSelected.length - 1].value,
	// 				username: optionSelected[optionSelected.length - 1].label,
	// 			};
	// 			setSelectedMembers([...selectedMembers, newMember]);
	// 			break;
	// 		// autres cas si nécessaire...
	// 		default:
	// 			break;
	// 	}
	// };

	const handleRemoveMember = (memberId) => {
		setSelectedMembers(
			selectedMembers.filter((member) => member.id !== memberId)
		);
	};

	return (
		<form
			className="w-5/6 mx-auto mb-9 flex flex-col"
			onSubmit={(e) => e.stopPropagation()}>
			<div className="text-center pt-4 px-2 md:px-4">
				<h5 className="text-gray-900 text-base md:text-lg leading-tight font-medium mb-2">
					<input
						className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 focus:outline-none focus:shadow-outline leading-tight p-2 rounded shadow w-full"
						maxLength={30}
						name="title"
						onChange={(e) =>
							setWorkspaceDataChange((prev) => ({
								...prev,
								title: e.target.value,
							}))
						}
						required
						type="text"
						value={workspaceDataChange.title}
					/>
				</h5>
				{workspaceDataChange.isDefault === 'false' && contacts && (
					<ContactsSelect
						contacts={contacts}
						handleChange={handleSelectedMembersChange}
						handleRemoveMember={handleRemoveMember}
						selectedMembers={selectedMembers}
						workspace={workspaceDataChange}
					/>
				)}
			</div>

			<div className="md:mt-4 px-2 mb-4">
				<textarea
					className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 flex-grow focus:outline-none focus:shadow-outline p-2 resize-none rounded shadow w-full"
					cols="30"
					name="description"
					placeholder="Description (optionnel)"
					onChange={(e) =>
						setWorkspaceDataChange((prev) => ({
							...prev,
							description: e.target.value,
						}))
					}
					rows="5"
					value={workspaceDataChange.description}
				/>
			</div>
		</form>
	);
};

export default ModalEditWorkspace;
