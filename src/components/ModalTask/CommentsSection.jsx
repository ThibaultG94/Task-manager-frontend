import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { resetEditState, setHasEdited } from '../../store/feature/editState.slice';
import { useSetTaskNotification } from '../../api/notifications/useSetTaskNotification';
import getUserId from '../../api/users/getUserId';
import { useAddComment } from '../../api/comments/useAddComment';
import { useAddCommentReply } from '../../api/comments/useAddCommentReply';
import { useTasksHasBeenUpdated } from '../../utils/useTasksHasBeenUpdated';
import { toast } from 'react-toastify';
import { selectComments } from '../../store/selectors/commentSelectors';

const CommentsSection = ({ workspaceTask }) => {
    const dispatch = useDispatch();
    const editedTask = useSelector(selectEditedTask);
    const comments = useSelector(selectComments);

    const tasksHasBeenUpdated = useTasksHasBeenUpdated();
    const setTaskNotification = useSetTaskNotification();
    const addComment = useAddComment();
    const addCommentReply = useAddCommentReply();

    const [newComment, setNewComment] = useState('');
    const [isAddingComment, setIsAddingComment] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [taskComments, setTaskComments] = useState([]);

    useEffect(() => {
        if (comments) setTaskComments(comments);
    }, [comments]);

    // PENSER A RESET LES COMMENTS QUAND ON CHANGE DE TACHE

    const handleAddComment = async (parentId) => {
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

            const reply = newComment.trim();

            try {
                if (parentId) {
                    await addCommentReply(parentId, reply);
                } else {
                    await addComment(editedTask._id, reply);
                }

                dispatch(resetEditState());
                dispatch(setHasEdited(false));
                await tasksHasBeenUpdated(editedTask, editedTask.category);
                await setTaskNotification(editedTask, userId);

                setNewComment('');
                setIsAddingComment(false);
                setReplyingTo(null);
                toast.success('Le commentaire a été ajouté avec succès !');
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const renderComments = (comments) => {
        return comments && comments.map((comment, index) => (
            <div key={index} className="mb-4 p-2 border-b border-gray-200">
                <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-dark-blue text-white flex items-center justify-center mr-2">
                        {comment?.user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div className="text-sm text-gray-800 font-semibold">{comment?.user.username}</div>
                        <div className="text-xs text-gray-500">{new Date(comment?.createdAt).toLocaleString()}</div>
                    </div>
                </div>
                <div className="text-sm text-gray-700 mb-2">{comment?.content}</div>
                <div className="flex space-x-2">
                    <button
                        className="text-xs text-blue-500"
                        onClick={() => setReplyingTo(comment?._id)}
                    >
                        Répondre
                    </button>
                </div>
                {replyingTo === comment?._id && (
                    <div className="mt-2">
                        <textarea
                            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Écrire une réponse..."
                        ></textarea>
                        <div className="flex justify-end mt-2">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                onClick={() => handleAddComment(comment?._id)}
                            >
                                Envoyer
                            </button>
                            <button
                                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                                onClick={() => setReplyingTo(null)}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                )}
                {comment?.replies && comment?.replies.length > 0 && (
                    <div className="ml-4">
                        {renderComments(comment?.replies)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div className="mt-4 px-2">
            <div className="max-h-64 overflow-y-auto bg-white p-3 rounded-lg shadow-inner">
                {taskComments && taskComments.length > 0 ? (
                    renderComments(taskComments)
                ) : (
                    <div className="text-gray-600 text-center italic">Aucun commentaire pour le moment. Soyez le premier à commenter !</div>
                )}
            </div>
            {isAddingComment && !replyingTo && (
                <div className="mt-2">
                    <textarea
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Écrire un commentaire..."
                    ></textarea>
                    <div className="flex justify-end mt-2">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            onClick={() => handleAddComment()}
                        >
                            Envoyer
                        </button>
                        <button
                            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                            onClick={() => setIsAddingComment(false)}
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}
            {!isAddingComment && !replyingTo && (
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
