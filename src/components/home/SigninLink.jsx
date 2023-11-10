import React, { useEffect, useRef, useState } from 'react';

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
				Déjà inscrit ?{' '}
				<a
					href="#"
					className="text-[#5a385f] no-underline hover:underline"
					onClick={(e) => openModal(e)}>
					Se connecter
				</a>
			</p>

			{/* {isModalOpen && (
				<SignupForm closeModal={closeModal} modalRef={modalRef} />
			)} */}
		</>
	);
};

export default SignupLink;
