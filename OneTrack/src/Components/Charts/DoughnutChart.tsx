import React, { useEffect, useRef } from 'react';
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Config/Firebase';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

type Props = {};

function DoughnutChart({}: Props) {
	const DoughnutRef = useRef();
	const auth = getAuth();
	const user = auth.currentUser;

	const PullFavourites = async () => {
		if (user) {
			const docRef = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				console.log('Carousel Data:', data);
				let Favourites;
				data.Favourites.length === 0
					? (Favourites = data[Object.keys(data)[1]])
					: (Favourites = data.Favourites);

				console.log('Carousel List:', Favourites);
				return Favourites;
			} else {
				console.log('No such document!');
			}
		}
	};

	const data = {
		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
		datasets: [
			{
				label: '# of Votes',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	return (
		<div className="doughnut-chart-container">
			<Doughnut data={data} ref={DoughnutRef} />;
		</div>
	);
}

export default DoughnutChart;
