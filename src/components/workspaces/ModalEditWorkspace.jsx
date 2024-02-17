import React, { useEffect } from 'react';
import { selectEditedWorkspace } from '../../store/selectors/workspaceSelectors';
import { useSelector } from 'react-redux';
import ContactsSelect from '../modal/ContactsSelect';

const ModalEditWorkspace = ({
	contacts,
	selectedMembers,
	setSelectedMembers,
	workspaceData,
	setWorkspaceData,
}) => {
	const editedWorkspace = useSelector(selectEditedWorkspace);

	useEffect(() => {
		if (editedWorkspace) {
			setWorkspaceData((prevState) => ({
				...prevState,
				_id: editedWorkspace._id,
				title: editedWorkspace.title,
				description: editedWorkspace.description,
				invitationStatus: editedWorkspace.invitationStatus,
			}));
		}
	}, [editedWorkspace]);

	const handleSelectedMembersChange = (newSelectedMembers) => {
		setSelectedMembers(
			newSelectedMembers.map((option) => ({
				id: option.value,
				username: option.label,
			}))
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
							setWorkspaceData((prev) => ({
								...prev,
								title: e.target.value,
							}))
						}
						required
						type="text"
						value={workspaceData.title}
					/>
				</h5>
				{contacts && (
					<ContactsSelect
						contacts={contacts}
						handleChange={handleSelectedMembersChange}
						selectedMembers={selectedMembers}
						workspace={workspaceData}
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
						setWorkspaceData((prev) => ({
							...prev,
							description: e.target.value,
						}))
					}
					rows="5"
					value={workspaceData.description}
				/>
			</div>
		</form>
	);
};

export default ModalEditWorkspace;
