import React, { useEffect, useRef, useState } from 'react';
import { useGetUser } from '../../api/getUser';
import { useDispatch, useSelector } from 'react-redux';
import { useGetWorkspace } from '../../api/getWorkspace';
import { selectIsEditing } from '../../store/selectors/editStateSelectors';
import { setEditing, setHasEdited } from '../../store/feature/editState.slice';

const EditAssignedTo = ({ editedMember, setEditedMember, editedWorkspace }) => {
	const dispatch = useDispatch();
	const isEditing = useSelector(selectIsEditing);
	const [isEditingMember, setIsEditingMember] = useState(false);
	const inputMemberRef = useRef(null);
	const [convertedMember, setConvertedMember] = useState('');

	const [members, setMembers] = useState([]);
	const [membersId, setMembersId] = useState([]);
	const [membersName, setMembersName] = useState([]);

	const handleEditAssignedTo = (e) => {
		e.stopPropagation();
		setIsEditingMember(!isEditingMember);
		dispatch(setEditing(!isEditing));
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
		setIsEditingMember(false);
		dispatch(setEditing(false));
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
			{!isEditingMember && <span>{convertedMember}</span>}
			{isEditingMember && (
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
			{!isEditingMember && (
				<span
					className="edit-icon"
					onClick={(e) => handleEditAssignedTo(e)}></span>
			)}
		</div>
	);
};

export default EditAssignedTo;
