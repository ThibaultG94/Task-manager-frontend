import React, { useState } from 'react';
import useBlockContact from '../../api/users/useBlockContact';
import LoadingDeleteComponent from '../Buttons/LoadingDeleteComponent';
import { toast } from 'react-toastify';

const BlockContact = ({ closeModal, selectedContact }) => {
	const blockContact = useBlockContact();

    const [isLoading, setIsLoading] = useState(false);

	const handleBlockContact = async () => {
        try {
			setIsLoading(true);
			await blockContact(selectedContact.id);
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
				onClick={handleBlockContact}>
					<i className="fa-solid fa-ban"></i>
				</button>
			)}
		</div>
    );
};

export default BlockContact;