import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import LoadingScreen from '../../Pages/LoadingScreen/LoadingScreen';

type Props = { ListName: string; Tickers: string[]; Interval: string };

function StockCardSlider({ ListName, Tickers, Interval }: Props) {
	const DarqAPIKey = '02ed1124727146ac8b85481d17ef9393';
	const FinnAPIKey = 'ce8c86iad3i1ljtnrrggce8c86iad3i1ljtnrrh0';
	const [TickerInformation, setTickerInformation] = useState<any>();
	const [Loading, setLoading] = useState<boolean>(true);

	const PullStockList = async () => {
		console.log('Tickers:', Tickers);

		try {
			Tickers.forEach((Ticker: string, index: number) => {
				const config = {
					method: 'GET',
					headers: {
						'x-api-key': APIKey,
						accept: 'application/json',
						'Content-Type': 'application/json',
					},
				};
				axios
					.get(
						`https://api.darqube.com/data-api/market_data/quote/${Ticker}?token=02ed1124727146ac8b85481d17ef9393`,
						config
					)
					.then((response) => {
						console.log('Ticker Data:', response.data);
						setTickerInformation([...TickerInformation, response.data]);
					});
			});
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(`Error ${errorCode}:`, errorMessage);
		}
	};

	useEffect(() => {
		PullStockList();
		// .then(() => setLoading(false));
	}, []);

	return (
		<>
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					{TickerInformation.map((Stock: any) => {
						const data = Stock;
						return (
							<ResponsiveContainer width="100%" height="100%">
								<LineChart width={300} height={100} data={data}>
									<Line
										type="monotone"
										dataKey="pv"
										stroke="#8884d8"
										strokeWidth={2}
									/>
								</LineChart>
							</ResponsiveContainer>
						);
					})}
				</>
			)}
		</>
	);
}

export default StockCardSlider;
