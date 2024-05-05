import React from 'react';
import { useDispatch } from 'react-redux';
import { resetEditState, setHasEdited } from '../../store/feature/editState.slice';
import { useExitWorkspace } from '../../api/workspaces/useExitWorkspace';
import { toast } from 'react-toastify';

const ExitWorkspace = ({ setIsModalWorkspaceOpen, workspaceId }) => {
    const dispatch = useDispatch();

    const exitWorkspace = useExitWorkspace();

    const removeWorkspace = async () => {
		try {
			await exitWorkspace(workspaceId);
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			toast.success('Vous avez quitté le workspace avec succès !');
		} catch (error) {
			toast.error('Échec de la modification du workspace.');
			return;
		}
	};

    const handleExit = async () => {
        const confirmation = window.confirm(
			'Etes-vous sûr de vouloir quitter ce workspace ?'
		);

        if (confirmation) {
			await removeWorkspace();
			setIsModalWorkspaceOpen(false);
		}
    };

	return (
		<button
			className="hover:bg-red-error-2 text-base hover:text-red-error px-3 py-2 rounded-md absolute top-1 left-1"
			onClick={handleExit}>
			<i className="fa-solid fa-right-from-bracket"></i>
		</button>
	);
};

export default ExitWorkspace;