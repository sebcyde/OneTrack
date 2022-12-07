import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Config/Firebase';

const auth = getAuth();
const user = auth.currentUser;

export const PullStockLists = async () => {
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
