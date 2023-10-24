import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLongTermTasks } from '../../store/selectors/taskSelectors';
import TaskItem from './TaskItem';
import { updateDisplayTasks } from '../utils/updateDisplayTasks';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { sortTasks } from '../utils/sortTasks';

const DisplayLongTermTasks = ({ setSelectedTask, openModal }) => {
	const userLongTermTasks = useSelector(selectLongTermTasks);
	const [displayLongTermTasks, setDisplayLongTermTasks] = useState([]);
	const workspaces = useSelector(selectWorkspaces);

	const [expandedBlocks, setExpandedBlocks] = useState({
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
			await updateDisplayTasks(
				userLongTermTasks,
				workspaces,
				updatedTasks
			);
			const sortedTasks = await sortTasks(updatedTasks);
			setDisplayLongTermTasks(sortedTasks);
		};

		updateDisplayLongTermTasks();
	}, [userLongTermTasks]);

	return (
		<>
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
