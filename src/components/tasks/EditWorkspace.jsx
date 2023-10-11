import React, { useEffect, useRef, useState } from 'react';
import { useGetWorkspace } from '../../api/getWorkspace';
import { useDispatch, useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { selectIsEditing } from '../../store/selectors/editStateSelectors';
import { setEditing, setHasEdited } from '../../store/feature/editState.slice';

const EditWorkspace = ({ editedWorkspace, setEditedWorkspace }) => {
	const dispatch = useDispatch();
	const isEditing = useSelector(selectIsEditing);
	const [isEditingWorkspace, setIsEditingWorkspace] = useState(false);
	const inputWorkspaceRef = useRef(null);
	const [convertedWorkspace, setConvertedWorkspace] = useState('');

	const [workspaces, setWorkspaces] = useState([]);
	const userWorkspaces = useSelector(selectWorkspaces);
	const getWorkspace = useGetWorkspace();

	const handleEditWorkspace = (e) => {
		e.stopPropagation();
		setIsEditingWorkspace(!isEditingWorkspace);
		dispatch(setEditing(!isEditing));
	};

	const handleValidWorkspace = (e) => {
		e.stopPropagation();
		const newWorkspace = inputWorkspaceRef.current.value;
		if (editedWorkspace !== newWorkspace) {
			dispatch(setHasEdited(true));
		}
		setEditedWorkspace(newWorkspace);
		setIsEditingWorkspace(false);
		dispatch(setEditing(false));
	};

	useEffect(() => {
		const fetchConvertedWorkspace = async () => {
			const workspace = await getWorkspace(editedWorkspace);
			setConvertedWorkspace(workspace?.title);
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
