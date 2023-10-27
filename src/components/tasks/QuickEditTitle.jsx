import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import { setEditingField } from '../../store/feature/editState.slice';

const QuickEditTitle = ({ task, setSelectedTask }) => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			onDoubleClick={() => {
				setSelectedTask(task);
				dispatch(
					setEditingField({
						field: 'title',
						value: !isEditingField.title,
					})
				);
			}}
			className="p-1 pr-4 pt-0 max-w-xs flex justify-start whitespace-nowrap overflow-hidden self-center relative z-10 cursor-auto">
			<div className="rounded-full border border-black h-5 w-5 mr-2 bg-white self-center"></div>
			{!isEditingField.title && <span>{task?.title}</span>}
			{isEditingField.title && editedTask?._id === task.taskId ? (
				<input type="text" defaultValue={task?.title} className="p-0" />
			) : (
				isEditingField.title && <span>{task?.title}</span>
			)}
		</div>
	);
};

export default QuickEditTitle;
