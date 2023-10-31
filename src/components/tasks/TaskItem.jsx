import React from 'react';
import QuickEditTitle from './QuickEditTitle';
import QuickEditDeadline from './QuickEditDeadline';
import QuickEditStatus from './QuickEditStatus';
import QuickEditPriority from './QuickEditPriority';
import QuickEditWorkspace from './QuickEditWorkspace';
import ButtonToEditTaskInModal from './ButtonToEditTaskInModal';
import ButtonToGrab from './ButtonToGrab';

const TaskItem = ({ task, openModal, setSelectedTask }) => {
	return (
		<div className="task-item relative py-[20px] px-4 mx-auto">
			<ButtonToGrab />
			<QuickEditTitle task={task} setSelectedTask={setSelectedTask} />
			<QuickEditDeadline task={task} setSelectedTask={setSelectedTask} />
			<QuickEditStatus task={task} setSelectedTask={setSelectedTask} />
			<QuickEditPriority task={task} setSelectedTask={setSelectedTask} />
			<QuickEditWorkspace task={task} setSelectedTask={setSelectedTask} />
			<div className="text-left mx-auto p-1.5 px-2.5 bg-[#171f39] h-8 w-8 overflow-hidden flex items-center justify-center rounded-full relative cursor-auto">
				<span id="avatarLetterAssigned">{task.assignedToLetter}</span>
			</div>
			<ButtonToEditTaskInModal
				openModal={openModal}
				setSelectedTask={setSelectedTask}
				task={task}
			/>
		</div>
	);
};

export default TaskItem;
