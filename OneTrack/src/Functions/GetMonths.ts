export function getLastMonths(n: number) {
	var m = [
		'',
		'Jan',
		'Feb',
		'Mar',
		'Aprl',
		'May',
		'Jun',
		'July',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	var months = new Array();

	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth() + 1;

	var i = 0;
	do {
		months.push(m[parseInt((month > 9 ? '' : '0') + month)]);
		if (month == 1) {
			month = 12;
			year--;
		} else {
			month--;
		}
		i++;
	} while (i < n);

	return months.reverse();
}
