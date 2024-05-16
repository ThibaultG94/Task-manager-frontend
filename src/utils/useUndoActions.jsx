import { toast } from 'react-toastify';
import { useDeleteNotification } from '../api/notifications/useDeleteNotification';
import { useTasksHasBeenUpdated } from './useTasksHasBeenUpdated';
import { useEditTask } from '../api/tasks/useEditTask';

export const useUndoActions = () => {
    const editTask = useEditTask();
    const tasksHasBeenUpdated = useTasksHasBeenUpdated();
    const deleteNotification = useDeleteNotification();

    const notifyWithUndo = (previousTask, notifications) => {
        const toastId = toast(<div>
            Tâche mise à jour ! 
            <button className='button ml-4 bg-red-error-3' onClick={() => undoTask(previousTask, toastId, notifications)}>Annuler</button>
          </div>, {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: false,
          draggable: false
        });
    };

    const undoTask = async (previousTask, toastId, notifications) => {
        await editTask({
            status: previousTask.status,
            _id: previousTask.taskId
        });
        await tasksHasBeenUpdated(previousTask, previousTask.category);
        if (notifications && notifications.length > 0) {
            notifications.forEach(async (notificationId) => {
                await deleteNotification(notificationId);
            });
        }
        toast.dismiss(toastId);
        toast.success('Modifications annulées avec succès!');
    };

    return { notifyWithUndo, undoTask };
};
