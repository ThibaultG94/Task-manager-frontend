export const getInitials = (name) => {
	return name
		.split(' ')
		.map((word) => word[0])
		.join('');
};
