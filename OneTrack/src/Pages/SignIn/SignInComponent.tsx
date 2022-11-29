import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { SignIn, app } from '../../Config/Firebase.js';

function SignInComponent(): any {
	const auth = getAuth(app);
	const [UserEmail, setUserEmail] = useState('');
	const [UserPassword, setUserPassword] = useState('');
	const navigate = useNavigate();

	const SetSignIn = (e: any) => {
		e.preventDefault();
		SignIn(auth, UserEmail, UserPassword);
	};

	return (
		<div className="SignInContainer">
			<div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						SignIn(auth, UserEmail, UserPassword);
					}}
				>
					<h2>Welcome Back</h2>
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
					<Button onClick={SetSignIn}>Sign In</Button>
					<Link to="/signup">Create account</Link>
				</form>
			</div>
		</div>
	);
}

export default SignInComponent;
