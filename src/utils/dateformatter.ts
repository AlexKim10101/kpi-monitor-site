function formatDateToDDMMYYYY(isoDate: string): string {
	const [year, month, day] = isoDate.split("-");
	return `${day}/${month}/${year}`;
}

export default formatDateToDDMMYYYY;
