import React, { useEffect, useRef, useState } from 'react';
import SignupModal from './SignupModal';

const SignupLink = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const modalRef = useRef(null);

	const openModal = (e) => {
		e.stopPropagation();
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleClickOutside = (e) => {
		if (modalRef.current && !modalRef.current.contains(e.target)) {
			closeModal();
		}
	};

	useEffect(() => {
		if (isModalOpen) {
			window.addEventListener('click', handleClickOutside);
		} else {
			window.removeEventListener('click', handleClickOutside);
		}
	}, [isModalOpen]);

	return (
		<>
			<p className="text-center">
				Pas encore inscrit ?{' '}
				<a href="#" id="signup-link" onClick={(e) => openModal(e)}>
					S'inscrire
				</a>
			</p>

			{isModalOpen && (
				<SignupModal closeModal={closeModal} modalRef={modalRef} />
			)}
		</>
	);
};

export default SignupLink;
