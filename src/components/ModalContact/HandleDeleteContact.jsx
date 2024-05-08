import React, { useState } from 'react';
import LoadingDeleteComponent from '../Buttons/LoadingDeleteComponent';
import useDeleteContact from '../../api/users/useDeleteContact';
import { toast } from 'react-toastify';

const HandleDeleteContact = ({ closeModal }) => {
    const deleteContact = useDeleteContact();

    const [isLoading, setIsLoading] = useState(false);

    const handleRemoveContact = async () => {
		try {
			setIsLoading(true);
			await deleteContact();
			setIsLoading(false);

			toast.success('Le contact a été retiré avec succès !');
			closeModal();
		} catch (error) {
			toast.error('Échec de la suppression du contact.');
			return;
		}
    };  

    return (
        <div>
			{isLoading ? (
				<div>
					<LoadingDeleteComponent />
				</div>
			) : (
				<button
				className="text-base hover:text-red-error-2 rounded-md"
				onClick={handleRemoveContact}>
					<i className="fas fa-trash-alt"></i>
				</button>
			)}
		</div>
    );
};

export default HandleDeleteContact;