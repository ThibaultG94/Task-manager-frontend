import { useDispatch, useSelector } from 'react-redux';
import { resetEditState } from '../store/feature/editState.slice';
import {
	selectHasEdited,
	selectIsEditingWorkspace,
} from '../store/selectors/editStateSelectors';
import { setInitialEditedWorkspace } from '../store/feature/workspaces.slice';
import { formatWorkspaceForEditing } from './formatWorkspaceForEditing';

const useCheckIfEditedWorkspace = ({
	setIsModalWorkspaceOpen,
	setIsEditingWorkspace,
	selectedWorkspace,
}) => {
	const dispatch = useDispatch();
	const isEditingWorkspace = useSelector(selectIsEditingWorkspace);
	const hasEdited = useSelector(selectHasEdited);

	const checkIfEditedWorkspace = async () => {
		if (isEditingWorkspace || hasEdited) {
			let message;
			if (isEditingWorkspace) {
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
		setIsModalWorkspaceOpen(false);
		setIsEditingWorkspace(false);
		dispatch(resetEditState());
		const formattedWorkspace = await formatWorkspaceForEditing(
			selectedWorkspace
		);
		dispatch(setInitialEditedWorkspace(formattedWorkspace));
	};

	return checkIfEditedWorkspace;
};

export default useCheckIfEditedWorkspace;
