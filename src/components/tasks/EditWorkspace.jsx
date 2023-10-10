import React, { useEffect, useRef, useState } from 'react';
import { useGetWorkspace } from '../../api/getWorkspace';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';

const EditWorkspace = ({
	editState,
	setEditState,
	editedWorkspace,
	setEditedWorkspace,
}) => {
	const [isEditingWorkspace, setIsEditingWorkspace] = useState(false);
	const handleEditWorkspace = (e) => {
		e.stopPropagation();
		setIsEditingWorkspace(!isEditingWorkspace);
	};
	const inputWorkspaceRef = useRef(null);
	const [convertedWorkspace, setConvertedWorkspace] = useState('');
	const [workspaces, setWorkspaces] = useState([]);

	const userWorkspaces = useSelector(selectWorkspaces);
	const getWorkspace = useGetWorkspace();

	const handleValidWorkspace = (e) => {
		e.stopPropagation();
		const newWorkspace = inputWorkspaceRef.current.value;
		editedWorkspace !== newWorkspace
			? setEditState({
					isEditing: false,
					hasEdited: true,
			  })
			: setEditState({
					isEditing: false,
					hasEdited: editState.hasEdited,
			  });
		setEditedWorkspace(newWorkspace);
		setIsEditingWorkspace(false);
	};

	useEffect(() => {
		const fetchConvertedWorkspace = async () => {
			const workspace = await getWorkspace(editedWorkspace);
			setConvertedWorkspace(workspace.title);
		};

		fetchConvertedWorkspace();
	}, [editedWorkspace]);

	useEffect(() => {
		setWorkspaces(userWorkspaces);
	}, [userWorkspaces]);

	return (
		<div className="workspace-icon element-icon">
			{!isEditingWorkspace && <span>{convertedWorkspace}</span>}
			{isEditingWorkspace && (
				<>
					<select
						className="task-edit-select"
						defaultValue={editedWorkspace}
						ref={inputWorkspaceRef}>
						{workspaces &&
							workspaces.map((workspace) => (
								<option
									value={workspace._id}
									key={workspace._id}>
									{workspace.title}
								</option>
							))}
					</select>
					<button onClick={(e) => handleValidWorkspace(e)}>
						Valider
					</button>
					<button onClick={(e) => handleEditWorkspace(e)}>
						Annuler
					</button>
				</>
			)}
			{!isEditingWorkspace && (
				<span
					className="edit-icon"
					onClick={(e) => handleEditWorkspace(e)}></span>
			)}
		</div>
	);
};

export default EditWorkspace;
