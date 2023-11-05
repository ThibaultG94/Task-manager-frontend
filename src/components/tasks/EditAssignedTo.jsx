import React, { useEffect, useRef, useState } from 'react';
import { useGetUser } from '../../api/getUser';
import { useDispatch, useSelector } from 'react-redux';
import { useGetWorkspace } from '../../api/getWorkspace';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { updateEditedTask } from '../../store/feature/tasks.slice';

const EditAssignedTo = () => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);
	const inputMemberRef = useRef(null);
	const [convertedMember, setConvertedMember] = useState('');

	const [members, setMembers] = useState([]);
	const [membersId, setMembersId] = useState([]);
	const [membersName, setMembersName] = useState([]);

	const handleEditAssignedTo = (e) => {
		e.stopPropagation();
		dispatch(
			setEditingField({
				field: 'assignedTo',
				value: !isEditingField.assignedTo,
			})
		);
	};

	const getUser = useGetUser();
	const getWorkspace = useGetWorkspace();

	const handleValidMember = (e) => {
		e.stopPropagation();
		const newMember = inputMemberRef.current.value;
		if (editedTask?.assignedTo !== newMember) {
			dispatch(setHasEdited(true));
			dispatch(updateEditedTask({ assignedTo: newMember }));
		}
		dispatch(setEditingField({ field: 'assignedTo', value: false }));
	};

	useEffect(() => {
		const fetchGetMembers = async () => {
			const workspace = await getWorkspace(editedTask?.workspaceId);
			setMembersId(workspace?.members);
		};

		if (editedTask && editedTask?.workspaceId) fetchGetMembers();
	}, [editedTask]);

	useEffect(() => {
		const fetchConvertedMember = async () => {
			const user = await getUser(editedTask?.assignedTo);
			setConvertedMember(user?.username);
		};

		if (editedTask?.assignedTo) fetchConvertedMember();
	}, [editedTask?.assignedTo]);

	useEffect(() => {
		const fetchMembers = async () => {
			const names = await Promise.all(
				membersId.map(async (member) => {
					const user = await getUser(member);
					return user.username;
				})
			);
			setMembersName(names);
		};

		fetchMembers();
	}, [membersId]);

	useEffect(() => {
		const membersWithNames = membersName.map((name, index) => ({
			memberId: membersId[index],
			memberName: name,
		}));
		setMembers(membersWithNames);
	}, [membersName]);

	return (
		<div className="flex flex-wrap mb-2">
			{!isEditingField.assignedTo && (
				<div className="assigned-icon mt-2 ml-6 px-2 py-1 rounded-lg bg-light-blue-3">
					<span className="ml-2 text-lg">{convertedMember}</span>
				</div>
			)}
			{isEditingField.assignedTo && (
				<>
					<select
						className="task-edit-select"
						defaultValue={
							editedTask?.assignedTo
								? editedTask.assignedTo
								: 'default'
						}
						ref={inputMemberRef}>
						{members &&
							members.map((member) => (
								<option
									value={member.memberId}
									key={member.memberId}>
									{member.memberName}
								</option>
							))}
					</select>
					<button onClick={(e) => handleValidMember(e)}>
						Valider
					</button>
					<button onClick={(e) => handleEditAssignedTo(e)}>
						Annuler
					</button>
				</>
			)}
			{/* {!isEditingField.assignedTo && (
				<span
				className="edit-icon"
				onClick={(e) => handleEditAssignedTo(e)}></span>
			)} */}
		</div>
	);
};

export default EditAssignedTo;
