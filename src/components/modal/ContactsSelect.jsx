import React from 'react';
import Select from 'react-select';

const ContactsSelect = ({ contacts, handleChange, selectedMembers }) => {
	const options = contacts.map((contact) => ({
		value: contact.id,
		label: contact.username,
	}));

	const selectedOptions = selectedMembers.map((member) => ({
		value: member.userId,
		label: member.username,
	}));

	const getSelectedOptions = () => {
		return selectedMembers.map((member) => {
			return {
				value: member.id,
				label: member.username,
			};
		});
	};

	return (
		<div className="md:mr-2 relative w-full text-xs sm:text-sm md:text-base">
			<Select
				isMulti
				name="assignedTo"
				options={options}
				className="basic-multi-select"
				classNamePrefix="select"
				onChange={handleChange}
				value={getSelectedOptions()}
				placeholder="Ajouter des membres..."
			/>
		</div>
	);
};

export default ContactsSelect;
