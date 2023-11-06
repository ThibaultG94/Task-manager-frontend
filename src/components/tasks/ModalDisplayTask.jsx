import React from 'react';
import DisplayTitle from './DisplayTitle';
import EditStatus from './EditStatus';
import EditPriority from './EditPriority';
import EditDeadline from './EditDeadline';
import EditDescription from './EditDescription';
import EditComments from './EditComments';
import EditWorkspace from './EditWorkspace';
import EditAssignedTo from './EditAssignedTo';

const ModalDisplayTask = () => {
	return (
		<div className="py-3">
			<DisplayTitle itemTitle={false} modalTitle={true} />

			<div className="flex mt-3 mb-2">
				<EditStatus />
				<EditPriority />
				<EditDeadline />
			</div>

			<EditDescription />

			<div className="flex">
				<EditWorkspace />
				<EditAssignedTo />
			</div>
			{/* <EditComments /> */}
		</div>
	);
};

export default ModalDisplayTask;
