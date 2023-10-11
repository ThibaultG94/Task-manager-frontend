import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategoryDay } from '../components/utils/getCategoryDay';
import { formatDateForDisplay } from '../components/utils/formatDateForDisplay';

export const useEditTask = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const editTask = async (task, taskId) => {
		const payload = {
			task: task,
			id: taskId,
			category: task.deadline
				? await getCategoryDay(
						await formatDateForDisplay(task.deadline),
						task.status,
						task.deadline
				  )
				: null,
		};

		dispatch();
	};

	return editTask;
};
