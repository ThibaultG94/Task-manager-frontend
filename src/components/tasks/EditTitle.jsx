import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';

const EditTitle = ({ editedTitle, setEditedTitle }) => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const inputTitleRef = useRef(null);

	const handleEditTitle = (e) => {
		e.stopPropagation();
		dispatch(
			setEditingField({ field: 'title', value: !isEditingField.title })
		);
	};

	useEffect(() => {
		if (isEditingField.title) {
			inputTitleRef.current.focus();
		}
	}, [isEditingField.title]);

	const handleValidTitle = (e) => {
		e.stopPropagation();
		const newTitle = inputTitleRef.current.value;
		if (editedTitle !== newTitle) {
			dispatch(setHasEdited(true));
		}
		setEditedTitle(newTitle);
		dispatch(setEditingField({ field: 'title', value: false }));
	};

	return (
		<div className="title-icon relative">
			{!isEditingField.title && (
				<h2 className="pt-2 text-2xl font-bold">{editedTitle}</h2>
			)}
			{isEditingField.title && (
				<>
					<input
						type="text"
						className="task-edit-title pt-2 text-2xl"
						defaultValue={editedTitle}
						ref={inputTitleRef}
					/>
					<button
						className="save-title absolute right-20"
						onClick={(e) => handleValidTitle(e)}>
						Valider
					</button>
					<button
						className="absolute right-0"
						onClick={(e) => handleEditTitle(e)}>
						Annuler
					</button>
				</>
			)}
			{!isEditingField.title && (
				<span
					className="edit-icon"
					onClick={(e) => handleEditTitle(e)}></span>
			)}
		</div>
	);
};

export default EditTitle;
