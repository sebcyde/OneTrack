import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import LoadingScreen from '../../Pages/LoadingScreen/LoadingScreen';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const labels = ['January', 'February', 'March'];

const options = {
	plugins: {
		title: {
			display: true,
			text: 'Chart.js Bar Chart - Stacked',
		},
	},
	responsive: true,
	interaction: {
		mode: 'index' as const,
		intersect: false,
	},
	scales: {
		x: {
			stacked: true,
		},
		y: {
			stacked: true,
		},
	},
};

const data = {
	labels,
	datasets: [
		{
			label: 'Dataset 1',
			data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
			backgroundColor: 'rgb(255, 99, 132)',
			stack: 'Stack 0',
		},
		{
			label: 'Dataset 2',
			data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
			backgroundColor: 'rgb(75, 192, 192)',
			stack: 'Stack 0',
		},
		{
			label: 'Dataset 3',
			data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
			backgroundColor: 'rgb(53, 162, 235)',
			stack: 'Stack 1',
		},
	],
};

type Props = {};

function StackedBar() {
	const [Loading, setLoading] = useState<boolean>(true);

	return (
		<>
			{Loading ? (
				<LoadingScreen />
			) : (
				<div
					className="chart-container"
					style={{
						position: 'relative',
						width: '90vw',
						height: 'fit-content',
						margin: '20px auto',
						borderRadius: '10px',
						border: '1px solid blue',
						padding: '10px',
						boxShadow: '4px 4px 4px',
					}}
				>
					<Bar options={options} data={data} className="StackedBarContainer" />
				</div>
			)}
		</>
	);
}

export default StackedBar;
