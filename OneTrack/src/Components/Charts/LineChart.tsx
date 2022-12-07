import React, { useEffect, useState } from 'react';
import { getLastMonths } from '../../Functions/GetMonths';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Config/Firebase';
import LoadingScreen from '../../Pages/LoadingScreen/LoadingScreen';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

type Props = {
	UserID: string;
	AmountOfMonths: number;
};

function LineChartComponent({ UserID, AmountOfMonths }: Props) {
	const Last3Months = getLastMonths(AmountOfMonths);
	const [Loading, setLoading] = useState<boolean>(true);
	const [Income, setIncome] = useState<any>();
	const [Expenses, setExpenses] = useState<any>();

	const auth = getAuth();
	const user = auth.currentUser;

	const PullTransactions = async () => {
		if (user) {
			let IncomeRef = doc(db, `Users/${user.uid}/Transactions/Income`);
			let IncomeSnap = await getDoc(IncomeRef);
			if (IncomeSnap.exists()) {
				const IncomeData = IncomeSnap.data();
				console.log('Income Data:', IncomeData);
				setIncome(IncomeData);
			} else {
				console.log('No such document!');
			}
			let ExpensesRef = doc(db, `Users/${user.uid}/Transactions/Expenses`);
			let ExpensesSnap = await getDoc(ExpensesRef);
			if (ExpensesSnap.exists()) {
				const ExpensesData = ExpensesSnap.data();
				console.log('Expenses Data:', ExpensesData);
				setExpenses(ExpensesData);
			} else {
				console.log('No such document!');
			}
		}
	};

	useEffect(() => {
		PullTransactions().then(() => {
			setLoading(false);
		});
	}, []);

	// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];

	return (
		<div className="page">
			{Loading ? (
				<LoadingScreen />
			) : (
				<LineChart width={500} height={300} data={Income}>
					<Line type="monotone" dataKey="Amount" stroke="#8884d8" />
					<CartesianGrid stroke="#ccc" />
					<XAxis dataKey="Month" />
					<YAxis />
				</LineChart>
			)}
		</div>
	);
}

export default LineChartComponent;
