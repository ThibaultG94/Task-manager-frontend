import React, { useEffect, useState } from 'react';
import { useGetWorkspace } from '../../api/getWorkspace';
import { useSelector } from 'react-redux';
import { selectEditedTask } from '../../store/selectors/taskSelectors';

const TaskDisplayWorkspace = () => {
	const editedTask = useSelector(selectEditedTask);
	const [convertedWorkspace, setConvertedWorkspace] = useState('');
	const getWorkspace = useGetWorkspace();

	useEffect(() => {
		const fetchConvertedWorkspace = async () => {
			const workspace = await getWorkspace(editedTask?.workspaceId);
			setConvertedWorkspace(workspace?.title);
		};

		if (editedTask && editedTask?.workspaceId) fetchConvertedWorkspace();
	}, [editedTask]);

	return (
		<div className="flex flex-wrap mb-2">
			<div className="workspace-icon mt-2 px-2 py-1 rounded-lg bg-light-blue">
				<span className="ml-2 text-lg">{convertedWorkspace}</span>
			</div>
		</div>
	);
};

export default TaskDisplayWorkspace;
