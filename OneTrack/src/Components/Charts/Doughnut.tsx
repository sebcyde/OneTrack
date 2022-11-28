import React from 'react';

type Props = {};

function Doughnut({}: Props) {
	const DATA_COUNT = 5;
	const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

	const data = {
		labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
		datasets: [
			{
				label: 'Dataset 1',
				data: Utils.numbers(NUMBER_CFG),
				backgroundColor: Object.values(Utils.CHART_COLORS),
			},
		],
	};

	const config = {
		type: 'doughnut',
		data: data,
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Chart.js Doughnut Chart',
				},
			},
		},
	};

	return <div>Doughnut</div>;
}

export default Doughnut;
