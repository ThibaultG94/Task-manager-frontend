import React, { useEffect, useRef, useState } from 'react';
import { useGetWorkspace } from '../../api/getWorkspace';

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

	return (
		<div className="workspace-icon element-icon">
			{!isEditingWorkspace && <span>{convertedWorkspace}</span>}
			{isEditingWorkspace && (
				<>
					<select
						className="task-edit-select"
						ref={inputWorkspaceRef}></select>
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
