import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainNavbar from './Components/MainNavbar/MainNavbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Transactions from './Pages/Transactions/Transactions';
import LoadingScreen from './Pages/LoadingScreen/LoadingScreen';

function App() {
	const [Loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	return (
		<div className="App">
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					<MainNavbar />
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/transactions" element={<Transactions />} />
					</Routes>
				</>
			)}
		</div>
	);
}

export default App;
