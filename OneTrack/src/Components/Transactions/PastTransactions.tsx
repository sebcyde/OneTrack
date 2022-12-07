import { Chart } from 'chart.js';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { db } from '../../Config/Firebase';
import LoadingScreen from '../../Pages/LoadingScreen/LoadingScreen';
import LineChart from '../Charts/LineChart';

function PastTransactions() {
	const [Loading, setLoading] = useState<boolean>(true);
	let chartStatus = Chart.getChart('Doughnut');
	const navigate = useNavigate();
	const auth = getAuth();
	const user = auth.currentUser;

	const PullIncome = async () => {
		if (user) {
			const docRef = doc(db, `Users/${user.uid}/Transactions/Income`);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const IncomeData = docSnap.data();
				console.log('Income Data:', IncomeData);
				return IncomeData;
			} else {
				console.log('No such document!');
			}
		}
	};

	const PullExpenses = async () => {
		if (user) {
			const docRef = doc(db, `Users/${user.uid}/Transactions/Expenses`);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const ExpensesData = docSnap.data();
				console.log('Expenses Data:', ExpensesData);
				return ExpensesData;
			} else {
				console.log('No such document!');
			}
		}
	};

	// const AddFavourite = async (Item: object) => {
	// 	// Add To DB

	// 	if (user) {
	// 		const UserDB = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
	// 		await updateDoc(UserDB, {
	// 			Favourites: arrayUnion(Item),
	// 		});
	// 		console.log('Item Added To Favourites');
	// 		PullLists();
	// 		handleClose();
	// 	}
	// };
	useEffect(() => {
		PullIncome()
			.then(() => {
				PullExpenses();
			})
			.then(() => {
				setLoading(false);
			});
	}, []);

	return (
		<>
			{Loading ? (
				<LoadingScreen />
			) : (
				<div>
					<h1>PastTransactions</h1>
					<LineChart UserID={user!.uid} AmountOfMonths={3} />
					<Button
						onClick={() => {
							navigate('/newtransaction');
						}}
					>
						Add Transaction
					</Button>
				</div>
			)}
		</>
	);
}

export default PastTransactions;
