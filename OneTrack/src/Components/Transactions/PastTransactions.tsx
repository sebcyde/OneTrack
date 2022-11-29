import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { db } from '../../Config/Firebase';

function PastTransactions() {
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
		PullIncome();
		PullExpenses();
	}, []);

	return <div>PastTransactions</div>;
}

export default PastTransactions;
