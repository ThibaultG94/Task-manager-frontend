import React from 'react';
import { inverseDateFormat } from '../utils/inverseDateFormat';

const TaskItem = ({ task, openModal, setSelectedTask }) => {
	return (
		<div
			className="task-item"
			onClick={(e) => {
				openModal(e);
				setSelectedTask(task);
			}}>
			<div className="p-1 pr-4 pt-0 max-w-xs flex justify-start whitespace-nowrap overflow-hidden self-center">
				<div className="rounded-full border border-black h-5 w-5 mr-2 bg-white self-center"></div>
				{task.title}
			</div>
			<div
				className={
					`text-left mx-auto p-1.5 px-2.5 rounded-lg ` + task.category
				}>
				{task.status === 'Archived'
					? inverseDateFormat(task.deadline)
					: task.day}
			</div>
			<div
				className={
					`text-left mx-auto p-1.5 px-2.5 rounded-lg ` +
					task.convertedStatus
				}>
				{task.convertedStatus}
			</div>
			<div
				className={
					`text-left mx-auto p-1.5 px-2.5 rounded-lg ` +
					task.convertedPriority
				}>
				{task.convertedPriority}
			</div>
			<div className="text-left mx-auto p-1.5 px-2.5 rounded-lg">
				{task.workspaceTitle}
			</div>
			<div className="text-left mx-auto p-1.5 px-2.5 bg-[#171f39] h-8 w-8 overflow-hidden cursor-pointer flex items-center justify-center rounded-full">
				<span id="avatarLetterAssigned">{task.assignedToLetter}</span>
			</div>
		</div>
	);
};

export default TaskItem;
