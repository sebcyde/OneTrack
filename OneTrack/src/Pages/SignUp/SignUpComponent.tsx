import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { SignUp, app } from '../../Config/Firebase.js';

function SignUpComponent() {
	const auth = getAuth(app);
	const [UserPassword, setUserPassword] = useState('');
	const [UserEmail, setUserEmail] = useState('');
	const [UserName, setUserName] = useState('');

	const SetSignUp = (e: any) => {
		e.preventDefault();
		SignUp(auth, UserEmail, UserPassword, UserName);
	};

	return (
		<div className="SignUnContainer">
			<div>
				<form>
					<h2>Sign Up</h2>
					<input
						type="text"
						placeholder="Name"
						onChange={(e) => setUserName(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Email"
						onChange={(e) => setUserEmail(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Password"
						onChange={(e) => setUserPassword(e.target.value)}
					/>
					<Button onClick={SetSignUp}>Sign Up</Button>
					<Link to="/signin">Already have an account?</Link>
				</form>
			</div>
		</div>
	);
}

export default SignUpComponent;
