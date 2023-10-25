export function inverseDateFormat(dateString) {
	const [year, month, day] = dateString.split('-');
	return `${day}/${month}/${year}`;
}
