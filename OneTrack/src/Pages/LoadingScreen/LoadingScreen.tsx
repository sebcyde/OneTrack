import React from 'react';
import { FadeLoader } from 'react-spinners';

function LoadingScreen() {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<FadeLoader
				color={'#2EC4B6'}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
}

export default LoadingScreen;
