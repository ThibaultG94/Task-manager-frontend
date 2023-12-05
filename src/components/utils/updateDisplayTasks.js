import { getAssignedUser } from '../../api/getAssignedUser';
import { convertPriority } from './convertPriority';
import { convertStatus } from './convertStatus';
import { formatDateForDisplay } from './formatDateForDisplay';
import { getCategoryDay } from './getCategoryDay';

export const updateDisplayTasks = async (
	userTasks,
	workspaces,
	updatedTasks
) => {
	for (let i = 0; i < userTasks.length; i++) {
		if (userTasks && userTasks[i]) {
			const formattedDate = await formatDateForDisplay(
				userTasks[i].deadline
			);
			const day = await formatDateForDisplay(userTasks[i].deadline);
			const category = await getCategoryDay(
				day,
				userTasks[i].status,
				userTasks[i].deadline
			);
			const convertedStatus = await convertStatus(userTasks[i].status);
			const convertedPriority = await convertPriority(
				userTasks[i].priority
			);
			const workspace = await workspaces.find(
				(singleWorkspace) =>
					singleWorkspace._id === userTasks[i].workspaceId
			);
			const userAssigned = await getAssignedUser(userTasks[i].assignedTo);
			updatedTasks.push({
				title: userTasks[i].title,
				date: formattedDate,
				status: userTasks[i].status,
				convertedStatus: convertedStatus,
				priority: userTasks[i].priority,
				convertedPriority: convertedPriority,
				deadline: userTasks[i].deadline,
				description: userTasks[i].description,
				comments: userTasks[i].comments,
				workspace: workspace?._id,
				workspaceTitle: workspace && workspace?.title,
				assignedTo: userAssigned?._id,
				assignedToLetter: userAssigned?.username[0],
				taskId: userTasks[i]._id,
				category: category,
				day: day,
			});
		}
	}
};
