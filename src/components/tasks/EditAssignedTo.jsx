import React, { useEffect, useRef, useState } from 'react';
import { useGetUser } from '../../api/getUser';
import { useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { useGetWorkspace } from '../../api/getWorkspace';

const EditAssignedTo = ({
	editState,
	setEditState,
	editedMember,
	setEditedMember,
	editedWorkspace,
}) => {
	const [isEditingMember, setIsEditingMember] = useState(false);
	const handleEditAssignedTo = (e) => {
		e.stopPropagation();
		setIsEditingMember(!isEditingMember);
	};
	const inputMemberRef = useRef(null);
	const [convertedMember, setConvertedMember] = useState('');
	const [members, setMembers] = useState([]);
	const [membersId, setMembersId] = useState([]);
	const [membersName, setMembersName] = useState([]);

	const workspace = useSelector(selectWorkspaces).find(
		(workspace) => workspace._id === editedWorkspace
	);
	const getUser = useGetUser();
	const getWorkspace = useGetWorkspace();

	const handleValidMember = (e) => {
		e.stopPropagation();
		const newMember = inputMemberRef.current.value;
		editedMember !== newMember
			? setEditState({
					isEditing: false,
					hasEdited: true,
			  })
			: setEditState({
					isEditing: false,
					hasEdited: editState.hasEdited,
			  });
		setEditedMember(newMember);
		setIsEditingMember(false);
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
			console.log('editedMember', editedMember);
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
