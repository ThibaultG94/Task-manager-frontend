import React from 'react';
import TaskDisplayTitle from './TaskDisplayTitle';
import TaskDisplayStatus from './TaskDisplayStatus';
import TaskDisplayPriority from './TaskDisplayPriority';
import TaskDisplayDeadline from './TaskDisplayDeadline';
import TaskDisplayDescription from './TaskDisplayDescription';
import TaskDisplayComments from './TaskDisplayComments';
import TaskDisplayWorkspace from './TaskDisplayWorkspace';
import TaskDisplayAssignedTo from './TaskDisplayAssignedTo';

const ModalDisplayTask = () => {
	return (
		<div className="py-3">
			<TaskDisplayTitle itemTitle={false} modalTitle={true} />

			<div className="flex mt-3 mb-2">
				<TaskDisplayStatus />
				<TaskDisplayPriority />
				<TaskDisplayDeadline />
			</div>

			<TaskDisplayDescription />

			<div className="flex">
				<TaskDisplayWorkspace />
				<TaskDisplayAssignedTo />
			</div>
			{/* <TaskDisplayComments /> */}
		</div>
	);
};

export default ModalDisplayTask;
