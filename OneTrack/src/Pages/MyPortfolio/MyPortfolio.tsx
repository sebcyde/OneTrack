import { getAuth } from 'firebase/auth';
import {
	collection,
	doc,
	DocumentData,
	getDoc,
	getDocs,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import StockCardSlider from '../../Components/MyPortfolio/StockCardSlider';
import { db } from '../../Config/Firebase';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

type Props = {};

function MyPortfolio({}: Props) {
	const [Loading, setLoading] = useState<boolean>(true);
	const [StockLists, setStockLists] = useState<any[]>([]);
	const auth = getAuth();
	const user = auth.currentUser;
	const ShowLists = () => {
		console.log('Stock Lists:', StockLists);
	};

	const PullStockLists = async () => {
		if (user) {
			const querySnapshot = await getDocs(
				collection(db, `Users/${user.uid}/Stocks/`)
			);

			querySnapshot.forEach((doc) => {
				setStockLists([
					...StockLists,
					{ Name: doc.id, Symbols: doc.data().Tickers },
				]);

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
					<Button onClick={ShowLists}>Stock Lists</Button>
					<div className="SliderContainer">
						{StockLists.map((List, index: number) => {
							console.log('List:', List);
							return (
								<StockCardSlider
									key={index}
									ListName={List.Name}
									Tickers={List.Symbols}
									Interval="1d"
								/>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}

export default MyPortfolio;
