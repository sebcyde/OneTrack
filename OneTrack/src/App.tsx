import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainNavbar from './Components/MainNavbar/MainNavbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Transactions from './Pages/Transactions/Transactions';
import LoadingScreen from './Pages/LoadingScreen/LoadingScreen';
import SignUpComponent from './Pages/SignUp/SignUpComponent';
import SignInComponent from './Pages/SignIn/SignInComponent';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
	const [Loading, setLoading] = useState<boolean>(true);
	const [MainNav, setMainNav] = useState<any>(undefined);
	const navigate = useNavigate();
	const auth = getAuth();

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				console.log('From App. No User Present');
				navigate('/signin');
				setMainNav(undefined);
			} else {
				navigate('/');
				setMainNav(<MainNavbar />);
			}
		});
	}, []);

	return (
		<div className="App">
			{Loading ? (
				<LoadingScreen />
			) : (
				<>
					{MainNav}
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/signup" element={<SignUpComponent />} />
						<Route path="/signin" element={<SignInComponent />} />
						<Route path="/transactions" element={<Transactions />} />
					</Routes>
				</>
			)}
		</div>
	);
}

export default App;
