import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectShortTermTasks } from '../../store/selectors/taskSelectors';
import { formatDateForDisplay } from '../utils/formatDateForDisplay';
import { getCategoryDay } from '../utils/getCategoryDay';
import { convertStatus } from '../utils/convertStatus';
import { convertPriority } from '../utils/convertPriority';
import TaskItem from './TaskItem';

const DisplayShortTermTasks = ({ setSelectedTask, openModal }) => {
	const userShortTermTasks = useSelector(selectShortTermTasks);
	const [displayShortTermTasks, setDisplayShortTermTasks] = useState([]);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'retard-tasks': true,
		'today-tasks': true,
		'tomorrow-tasks': true,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayShortTermTasks = async () => {
			const updatedTasks = [];
			for (let i = 0; i < userShortTermTasks.length; i++) {
				if (userShortTermTasks && userShortTermTasks[i]) {
					const formattedDate = await formatDateForDisplay(
						userShortTermTasks[i].deadline
					);
					const day = await formatDateForDisplay(
						userShortTermTasks[i].deadline
					);
					const category = await getCategoryDay(
						day,
						userShortTermTasks[i].status,
						userShortTermTasks[i].deadline
					);
					const convertedStatus = await convertStatus(
						userShortTermTasks[i].status
					);
					const convertedPriority = await convertPriority(
						userShortTermTasks[i].priority
					);
					updatedTasks.push({
						title: userShortTermTasks[i].title,
						date: formattedDate,
						status: userShortTermTasks[i].status,
						convertedStatus: convertedStatus,
						priority: userShortTermTasks[i].priority,
						convertedPriority: convertedPriority,
						deadline: userShortTermTasks[i].deadline,
						description: userShortTermTasks[i].description,
						comments: userShortTermTasks[i].comments,
						workspace: userShortTermTasks[i].workspaceId,
						assignedTo: userShortTermTasks[i].assignedTo,
						taskId: userShortTermTasks[i]._id,
						category: category,
						day: day,
					});
				}
			}
			setDisplayShortTermTasks(updatedTasks);
		};

		updateDisplayShortTermTasks();
	}, [userShortTermTasks]);

	return (
		<>
			{displayShortTermTasks.filter(
				(task) => task.category === 'retard-tasks'
			).length > 0 && (
				<div
					id="retard-tasks"
					className={`task-block ${
						expandedBlocks['retard-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('retard-tasks')}>
					<div className="task-block-header">
						<h3>Retard</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('retard-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayShortTermTasks &&
						displayShortTermTasks?.length > 0
							? displayShortTermTasks
									.filter(
										(task) =>
											task.category === 'retard-tasks'
									)
									.map((task, index) => (
										<TaskItem
											task={task}
											openModal={openModal}
											key={index}
											setSelectedTask={setSelectedTask}
										/>
									))
							: null}
					</div>
				</div>
			)}

			{displayShortTermTasks.filter(
				(task) => task.category === 'today-tasks'
			).length > 0 && (
				<div
					id="today-tasks"
					className={`task-block ${
						expandedBlocks['today-tasks'] ? 'expanded' : ''
					}`}>
					<div className="task-block-header">
						<h3>Aujourd'hui</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('today-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayShortTermTasks &&
						displayShortTermTasks?.length > 0
							? displayShortTermTasks
									.filter(
										(task) =>
											task.category === 'today-tasks'
									)
									.map((task, index) => (
										<TaskItem
											task={task}
											openModal={openModal}
											key={index}
											setSelectedTask={setSelectedTask}
										/>
									))
							: null}
					</div>
				</div>
			)}

			{displayShortTermTasks.filter(
				(task) => task.category === 'today-tasks'
			).length > 0 && (
				<div
					id="tomorrow-tasks"
					className={`task-block ${
						expandedBlocks['tomorrow-tasks'] ? 'expanded' : ''
					}`}>
					<div className="task-block-header">
						<h3>Demain</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('tomorrow-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayShortTermTasks &&
						displayShortTermTasks?.length > 0
							? displayShortTermTasks
									.filter(
										(task) =>
											task.category === 'tomorrow-tasks'
									)
									.map((task, index) => (
										<TaskItem
											task={task}
											openModal={openModal}
											key={index}
											setSelectedTask={setSelectedTask}
										/>
									))
							: null}
					</div>
				</div>
			)}
		</>
	);
};

export default DisplayShortTermTasks;