import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

type Props = {};

function NewTransaction({}: Props) {
	const navigate = useNavigate();

	useEffect(() => {
		console.log('New Transactions');
	}, []);

	return (
		<div>
			<h2>NewTransaction</h2>
			<Button
				onClick={() => {
					navigate('/transactions');
				}}
			>
				Back
			</Button>
		</div>
	);
}

export default NewTransaction;
