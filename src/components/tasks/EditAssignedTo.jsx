import React, { useEffect, useRef, useState } from 'react';
import { useGetUser } from '../../api/getUser';
import { useDispatch, useSelector } from 'react-redux';
import { useGetWorkspace } from '../../api/getWorkspace';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';

const EditAssignedTo = ({ editedMember, setEditedMember, editedWorkspace }) => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
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
		if (editedMember !== newMember) {
			dispatch(setHasEdited(true));
		}
		setEditedMember(newMember);
		dispatch(setEditingField({ field: 'assignedTo', value: false }));
	};

	useEffect(() => {
		const fetchGetMembers = async () => {
			const workspace = await getWorkspace(editedWorkspace);
			setMembersId(workspace.members);
		};

		fetchGetMembers();
	}, [editedWorkspace]);

	useEffect(() => {
		const fetchConvertedMember = async () => {
			const user = await getUser(editedMember);
			setConvertedMember(user.username);
		};

		fetchConvertedMember();
	}, [editedMember]);

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
		<div className="assigned-icon element-icon">
			{!isEditingField.assignedTo && <span>{convertedMember}</span>}
			{isEditingField.assignedTo && (
				<>
					<select
						className="task-edit-select"
						defaultValue={editedMember ? editedMember : 'default'}
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
			{!isEditingField.assignedTo && (
				<span
					className="edit-icon"
					onClick={(e) => handleEditAssignedTo(e)}></span>
			)}
		</div>
	);
};

export default EditAssignedTo;
