import { useDispatch, useSelector } from 'react-redux';
import { resetEditState } from '../../../store/feature/editState.slice';
import {
	selectHasEdited,
	selectIsEditingField,
} from '../../../store/selectors/editStateSelectors';

const useCheckIfEdited = ({
	setIsModalOpen,
	setIsEditing,
	selectedTask,
	formatTaskForEditing,
	setInitialEditedTask,
}) => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const hasEdited = useSelector(selectHasEdited);

	const checkIfEdited = async () => {
		const anyFieldEditing = Object.values(isEditingField).some(Boolean);
		if (anyFieldEditing || hasEdited) {
			let message;
			if (anyFieldEditing) {
				message =
					"Vous êtes en train d'éditer. Voulez-vous vraiment quitter sans sauvegarder ?";
			} else if (hasEdited) {
				message =
					'Vous avez des changements non sauvegardés. Voulez-vous vraiment quitter sans sauvegarder ?';
			}
			const userResponse = window.confirm(message);
			if (!userResponse) {
				return;
			}
		}
		setIsModalOpen(false);
		setIsEditing(false);
		dispatch(resetEditState());
		const formattedTask = await formatTaskForEditing(selectedTask);
		dispatch(setInitialEditedTask(formattedTask));
	};

	return checkIfEdited;
};

export default useCheckIfEdited;
