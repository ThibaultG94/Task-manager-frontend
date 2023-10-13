import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLongTermTasks } from '../../store/selectors/taskSelectors';
import TaskItem from './TaskItem';
import { formatDateForDisplay } from '../utils/formatDateForDisplay';
import { getCategoryDay } from '../utils/getCategoryDay';
import { convertStatus } from '../utils/convertStatus';
import { convertPriority } from '../utils/convertPriority';

const DisplayLongTermTasks = ({ setSelectedTask, openModal }) => {
	const userLongTermTasks = useSelector(selectLongTermTasks);
	const [displayLongTermTasks, setDisplayLongTermTasks] = useState([]);

	const [expandedBlocks, setExpandedBlocks] = useState({
		'this-month-tasks': false,
		'next-month-tasks': false,
		'this-year-tasks': false,
		'next-year-tasks': false,
		'becoming-tasks': false,
	});

	const toggleBlock = (blockId) => {
		setExpandedBlocks({
			...expandedBlocks,
			[blockId]: !expandedBlocks[blockId],
		});
	};

	useEffect(() => {
		const updateDisplayLongTermTasks = async () => {
			const updatedTasks = [];
			for (let i = 0; i < userLongTermTasks.length; i++) {
				if (userLongTermTasks && userLongTermTasks[i]) {
					const formattedDate = await formatDateForDisplay(
						userLongTermTasks[i].deadline
					);
					const day = await formatDateForDisplay(
						userLongTermTasks[i].deadline
					);
					const category = await getCategoryDay(
						day,
						userLongTermTasks[i].status,
						userLongTermTasks[i].deadline
					);
					const convertedStatus = await convertStatus(
						userLongTermTasks[i].status
					);
					const convertedPriority = await convertPriority(
						userLongTermTasks[i].priority
					);
					updatedTasks.push({
						title: userLongTermTasks[i].title,
						date: formattedDate,
						status: userLongTermTasks[i].status,
						convertedStatus: convertedStatus,
						priority: userLongTermTasks[i].priority,
						convertedPriority: convertedPriority,
						deadline: userLongTermTasks[i].deadline,
						description: userLongTermTasks[i].description,
						comments: userLongTermTasks[i].comments,
						workspace: userLongTermTasks[i].workspaceId,
						assignedTo: userLongTermTasks[i].assignedTo,
						taskId: userLongTermTasks[i]._id,
						category: category,
						day: day,
					});
				}
			}
			setDisplayLongTermTasks(updatedTasks);
		};

		updateDisplayLongTermTasks();
	}, [userLongTermTasks]);

	return (
		<>
			{displayLongTermTasks.filter(
				(task) => task.category === 'this-month-tasks'
			).length > 0 && (
				<div
					id="this-month-tasks"
					className={`task-block ${
						expandedBlocks['this-month-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-month-tasks')}>
					<div className="task-block-header">
						<h3>Ce mois-ci</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('this-month-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayLongTermTasks &&
						displayLongTermTasks?.length > 0
							? displayLongTermTasks
									.filter(
										(task) =>
											task.category === 'this-month-tasks'
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

			{displayLongTermTasks.filter(
				(task) => task.category === 'next-month-tasks'
			).length > 0 && (
				<div
					id="next-month-tasks"
					className={`task-block ${
						expandedBlocks['next-month-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('next-month-tasks')}>
					<div className="task-block-header">
						<h3>Mois prochain</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('next-month-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayLongTermTasks &&
						displayLongTermTasks?.length > 0
							? displayLongTermTasks
									.filter(
										(task) =>
											task.category === 'next-month-tasks'
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

			{displayLongTermTasks.filter(
				(task) => task.category === 'this-year-tasks'
			).length > 0 && (
				<div
					id="this-year-tasks"
					className={`task-block ${
						expandedBlocks['this-year-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('this-year-tasks')}>
					<div className="task-block-header">
						<h3>Cette année</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('this-year-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayLongTermTasks &&
						displayLongTermTasks?.length > 0
							? displayLongTermTasks
									.filter(
										(task) =>
											task.category === 'this-year-tasks'
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

			{displayLongTermTasks.filter(
				(task) => task.category === 'next-year-tasks'
			).length > 0 && (
				<div
					id="next-year-tasks"
					className={`task-block ${
						expandedBlocks['next-year-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('next-year-tasks')}>
					<div className="task-block-header">
						<h3>Année prochaine</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('next-year-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayLongTermTasks &&
						displayLongTermTasks?.length > 0
							? displayLongTermTasks
									.filter(
										(task) =>
											task.category === 'next-year-tasks'
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

			{displayLongTermTasks.filter(
				(task) => task.category === 'becoming-tasks'
			).length > 0 && (
				<div
					id="becoming-tasks"
					className={`task-block ${
						expandedBlocks['becoming-tasks'] ? 'expanded' : ''
					}`}
					onClick={() => toggleBlock('becoming-tasks')}>
					<div className="task-block-header">
						<h3>Prochaines années</h3>
						<button
							className="toggle-button"
							onClick={(e) => {
								e.stopPropagation();
								toggleBlock('becoming-tasks');
							}}>
							▶
						</button>
					</div>
					<div className="task-list">
						{displayLongTermTasks &&
						displayLongTermTasks?.length > 0
							? displayLongTermTasks
									.filter(
										(task) =>
											task.category === 'becoming-tasks'
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

export default DisplayLongTermTasks;
