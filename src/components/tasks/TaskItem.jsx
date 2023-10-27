import React from 'react';
import { inverseDateFormat } from '../utils/inverseDateFormat';
import QuickEditTitle from './QuickEditTitle';

const TaskItem = ({ task, openModal, setSelectedTask }) => {
	return (
		<div
			className="task-item hover:bg-orange-primary relative z-0 cursor-pointer py-[20px] px-4 mx-auto"
			onClick={(e) => {
				e.stopPropagation();
				openModal(e);
				setSelectedTask(task);
			}}>
			<QuickEditTitle task={task} setSelectedTask={setSelectedTask} />

			<div
				className={
					`text-left mx-auto p-1.5 px-2.5 rounded-lg relative z-10 cursor-auto ` +
					task.category
				}>
				{task.status === 'Archived'
					? inverseDateFormat(task.deadline)
					: task.day}
			</div>
			<div
				className={
					`text-left mx-auto p-1.5 px-2.5 rounded-lg relative z-10 cursor-auto ` +
					task.convertedStatus
				}>
				{task.convertedStatus}
			</div>
			<div
				className={
					`text-left mx-auto p-1.5 px-2.5 rounded-lg relative z-10 cursor-auto ` +
					task.convertedPriority
				}>
				{task.convertedPriority}
			</div>
			<div className="text-left mx-auto p-1.5 px-2.5 rounded-lg relative z-10 cursor-auto">
				{task.workspaceTitle}
			</div>
			<div className="text-left mx-auto p-1.5 px-2.5 bg-[#171f39] h-8 w-8 overflow-hidden flex items-center justify-center rounded-full relative z-10 cursor-auto">
				<span id="avatarLetterAssigned">{task.assignedToLetter}</span>
			</div>
		</div>
	);
};

export default TaskItem;
