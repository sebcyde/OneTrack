import { getAuth } from 'firebase/auth';
import {
	collection,
	doc,
	DocumentData,
	getDoc,
	getDocs,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Firebase';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

type Props = {};

function MyPortfolio({}: Props) {
	const [Loading, setLoading] = useState<boolean>(true);
	const [StockLists, setStockLists] = useState<DocumentData | undefined>();
	const auth = getAuth();
	const user = auth.currentUser;

	const PullStockLists = async () => {
		if (user) {
			// console.log('Pulling Stock Lists');
			// let StockListsRef = doc(db, `Users/${user.uid}/Stocks/Por`);
			// let StockListsSnap = await getDoc(StockListsRef);
			// if (StockListsSnap.exists()) {
			// 	const StockListsData = StockListsSnap.data();
			// 	console.log('Stock Lists Data:', StockListsData);
			// 	setStockLists(StockListsData);
			// } else {
			// 	console.log('Portfolio Data Pull Failed!');
			// }

			const querySnapshot = await getDocs(
				collection(db, `Users/${user.uid}/Stocks/`)
			);
			querySnapshot.forEach((doc) => {
				console.log(doc.id, ' => ', doc.data());
			});
		}
	};

	useEffect(() => {
		PullStockLists().then(() => {
			setLoading(false);
		});
	}, []);

	return (
		<div>
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<h2>Portfolios</h2>
				</>
			)}
		</div>
	);
}

export default MyPortfolio;
