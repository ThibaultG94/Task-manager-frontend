import React from 'react';
import Select from 'react-select';

const ContactsSelect = ({ contacts, selectedMembers, setSelectedMembers }) => {
	const options = contacts.map((contact) => ({
		value: contact.id,
		label: contact.username,
	}));

	const handleChange = (selectedOptions) => {
		setSelectedMembers(selectedOptions.map((option) => option.value));
	};

	const value = options.filter((option) =>
		selectedMembers.includes(option.value)
	);

	return (
		<div className="md:mr-2 relative w-full text-xs sm:text-sm md:text-base">
			<Select
				isMulti
				name="assignedTo"
				options={options}
				className="basic-multi-select"
				classNamePrefix="select"
				onChange={handleChange}
				value={value}
				placeholder="Ajouter des membres..."
			/>
		</div>
	);
};

export default ContactsSelect;
