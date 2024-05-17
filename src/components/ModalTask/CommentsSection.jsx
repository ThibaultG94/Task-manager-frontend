import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { resetEditState } from '../../store/feature/editState.slice';
import { useEditTask } from '../../api/tasks/useEditTask';
import { useSetTaskNotification } from '../../api/notifications/useSetTaskNotification';
import getUserId from '../../api/users/getUserId';
import { useTasksHasBeenUpdated } from '../../utils/useTasksHasBeenUpdated';
import { toast } from 'react-toastify';

const CommentsSection = ({ workspaceTask }) => {
    const dispatch = useDispatch();
    const editedTask = useSelector(selectEditedTask);

    const editTask = useEditTask();
    const tasksHasBeenUpdated = useTasksHasBeenUpdated();
    const setTaskNotification = useSetTaskNotification();

    const [newComment, setNewComment] = useState('');
    const [isAddingComment, setIsAddingComment] = useState(false);

    const handleAddComment = async () => {
        if (newComment.trim()) {
            const userId = await getUserId();

            let assigned = [];

            for (const user of editedTask.assignedTo) {
				const member = workspaceTask.members.find(member => member.userId === user.userId);
				if (!member) {
					throw new Error(`Member not found for member: ${user.username}`);
				}
				assigned.push(member.userId);
			}

            console.log('editedTask.comments', editedTask.comments);
            console.log("editedTask", editedTask);

            let comments = [
                ...editedTask.comments,
                {
                    userId,
                    content: newComment,
                    createdAt: new Date().toISOString(),
                },
            ]

            const task = {
				_id: editedTask._id,
				title: editedTask.title,
				status: editedTask.status,
				priority: editedTask.priority,
				deadline: editedTask.deadline,
				description: editedTask.description,
				workspaceId: editedTask.workspaceId,
				assignedTo: assigned,
				category: editedTask.category,
				comments,
			};

            await editTask(task);
            dispatch(resetEditState());
            await tasksHasBeenUpdated(task, editedTask.category);
            await setTaskNotification(task, userId);

            
            setNewComment('');
            setIsAddingComment(false);
            toast.success('Le commentaire a été ajouté avec succès !');
        }
    };

    return (
        <div className="mt-4 px-2">
            <div className="max-h-64 overflow-y-auto bg-white p-3 rounded-lg shadow-inner">
                {editedTask?.comments && editedTask?.comments.length > 0 ? (
                    editedTask?.comments.map((comment, index) => (
                        <div key={index} className="mb-2">
                            <div className="text-sm text-gray-800 font-semibold">{comment.username}</div>
                            <div className="text-xs text-gray-600">{comment.message}</div>
                            <div className="text-xs text-gray-500">{new Date(comment.date).toLocaleString()}</div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-600 text-center italic">Aucun commentaire pour le moment. Soyez le premier à commenter !</div>
                )}
            </div>
            {isAddingComment ? (
                <div className="mt-2">
                    <textarea
                        className="w-full border border-gray-300 p-2 rounded-lg"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Écrire un commentaire..."
                    ></textarea>
                    <button
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        onClick={handleAddComment}
                    >
                        Envoyer
                    </button>
                    <button
                        className="mt-2 ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        onClick={() => setIsAddingComment(false)}
                    >
                        Annuler
                    </button>
                </div>
            ) : (
                <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={() => setIsAddingComment(true)}
                >
                    + Ajouter un commentaire
                </button>
            )}
        </div>
    );
};

export default CommentsSection;
