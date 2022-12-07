import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { db } from '../../Config/Firebase';

function MainNavbar() {
	const auth = getAuth();
	const user = auth.currentUser;

	const PullData = async () => {
		if (user) {
			// Retrieve main user info
			const userRef = doc(db, `Users/${user.uid}`);
			const userSnap = await getDoc(userRef);
			if (userSnap.exists()) {
				console.log('User data:', userSnap.data());
			} else {
				console.log('User Data Pull Failed!');
			}

			// Retrieve User StockLists info
			const stocksSnapshot = await getDocs(
				collection(db, `Users/${user.uid}/Stocks/`)
			);
			stocksSnapshot.forEach((doc: { id: any; data: () => any }) => {
				console.log(doc.id, ' => ', doc.data());
			});

			// Retrieve User Transactions info
			const transactionsSnapshot = await getDocs(
				collection(db, `Users/${user.uid}/Transactions/`)
			);
			transactionsSnapshot.forEach((doc: { id: any; data: () => any }) => {
				console.log(doc.id, ' => ', doc.data());
			});
		}
	};

	return (
		<Navbar collapseOnSelect expand="lg" className="MainNavbar" variant="dark">
			<Container>
				<Navbar.Brand href="#home">OneTrack</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link eventKey="1" as={Link} to="/">
							Dashboard
						</Nav.Link>
						<Nav.Link eventKey="2" as={Link} to="transactions">
							Transactions
						</Nav.Link>

						<Nav.Link eventKey="3" as={Link} to="portfolio">
							My Portfolio
						</Nav.Link>
						<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav>
						<Nav.Link href="#deets">More deets</Nav.Link>
						<Nav.Link eventKey={2} href="#memes">
							Dank memes
						</Nav.Link>
						<Button onClick={PullData}>Pull User Data</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default MainNavbar;
