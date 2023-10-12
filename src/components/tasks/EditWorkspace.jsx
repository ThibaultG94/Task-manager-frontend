import React, { useEffect, useRef, useState } from 'react';
import { useGetWorkspace } from '../../api/getWorkspace';
import { useDispatch, useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { updateEditedTask } from '../../store/feature/tasks.slice';

const EditWorkspace = () => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const [isEditingWorkspace, setIsEditingWorkspace] = useState(false);
	const editedTask = useSelector(selectEditedTask);
	const inputWorkspaceRef = useRef(null);
	const [convertedWorkspace, setConvertedWorkspace] = useState('');

	const [workspaces, setWorkspaces] = useState([]);
	const userWorkspaces = useSelector(selectWorkspaces);
	const getWorkspace = useGetWorkspace();

	const handleEditWorkspace = (e) => {
		e.stopPropagation();
		setIsEditingWorkspace(!isEditingWorkspace);
		dispatch(
			setEditingField({
				field: 'workspace',
				value: !isEditingField.workspace,
			})
		);
	};

	const handleValidWorkspace = (e) => {
		e.stopPropagation();
		const newWorkspace = inputWorkspaceRef.current.value;
		if (editedTask.workspaceId !== newWorkspace) {
			dispatch(setHasEdited(true));
			dispatch(updateEditedTask({ workspaceId: newWorkspace }));
		}
		setIsEditingWorkspace(false);
		dispatch(setEditingField({ field: 'workspace', value: false }));
	};

	useEffect(() => {
		const fetchConvertedWorkspace = async () => {
			const workspace = await getWorkspace(editedTask?.workspaceId);
			setConvertedWorkspace(workspace?.title);
		};

		if (editedTask?.workspaceId) fetchConvertedWorkspace();
	}, [editedTask]);

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
						defaultValue={editedTask?.workspaceId}
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
