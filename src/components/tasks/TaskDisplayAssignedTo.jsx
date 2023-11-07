import React, { useEffect, useState } from 'react';
import { useGetUser } from '../../api/getUser';
import { useSelector } from 'react-redux';
import { selectEditedTask } from '../../store/selectors/taskSelectors';

const TaskDisplayAssignedTo = () => {
	const editedTask = useSelector(selectEditedTask);
	const [convertedMember, setConvertedMember] = useState('');

	const getUser = useGetUser();

	useEffect(() => {
		const fetchConvertedMember = async () => {
			const user = await getUser(editedTask?.assignedTo);
			setConvertedMember(user?.username);
		};

		if (editedTask?.assignedTo) fetchConvertedMember();
	}, [editedTask?.assignedTo]);

	return (
		<div className="flex flex-wrap mb-2">
			<div className="assigned-icon mt-2 ml-6 px-2 py-1 rounded-lg bg-light-blue-3">
				<span className="ml-2 text-lg">{convertedMember}</span>
			</div>
		</div>
	);
};

export default TaskDisplayAssignedTo;
