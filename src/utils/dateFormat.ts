export function formatDateToMonthYear(dateString: string): string {
    const isDateFormat = dateString.match(/^\d{4}-\d{2}-\d{2}$/); // YYYY-MM-DD
    if (isDateFormat === null) {
        return dateString;
    }
    const [year, month] = dateString.split('-'); // Split the date string by '-'
    const monthNames: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName: string = monthNames[parseInt(month, 10) - 1]; // Get the month name from the array
    return `${monthName} ${year}`;
}

