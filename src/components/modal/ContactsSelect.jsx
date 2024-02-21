import React from 'react';
import Select from 'react-select';

const ContactsSelect = ({
	contacts,
	handleChange,
	selectedMembers,
	workspace,
}) => {
	const getOptions = () => {
		if (workspace && workspace.invitationStatus) {
			return contacts
				.filter(
					(contact) =>
						!workspace.invitationStatus.some(
							(inv) =>
								inv.userId === contact.id &&
								(inv.status === 'pending' ||
									inv.status === 'declined')
						)
				)
				.map((contact) => {
					return {
						value: contact.id,
						label: contact.username,
					};
				});
		} else {
			return contacts.map((contact) => ({
				value: contact.id,
				label: contact.username,
			}));
		}
	};

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
				options={getOptions()}
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
