import { initializeApp } from 'firebase/app';
import { doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDHdmWWI4_sGEo_7xEXHKnIICreHze8ins',
	authDomain: 'onetrack-ba113.firebaseapp.com',
	projectId: 'onetrack-ba113',
	storageBucket: 'onetrack-ba113.appspot.com',
	messagingSenderId: '936654947760',
	appId: '1:936654947760:web:ce5a2e1a8a1134dc748275',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Sign Up New Users
export const SignUp = async (
	auth: any,
	email: string,
	password: string,
	Name: string
) => {
	try {
		const UserCred = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = UserCred.user;

		console.log(`${Name}Sign Up Successful:`, user);
		Name = Name.charAt(0).toUpperCase() + Name.slice(1);

		// Create a DB instance for new user
		await setDoc(doc(db, `Users/${user.uid}`), {
			UserEmail: user.email,
			Name: Name,
			DisplayPicture: user.photoURL,
			CreationDate: user.metadata.creationTime,
			UID: user.uid,
		});

		const month = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		const d = new Date();
		let name = month[d.getMonth()].slice(0, 3);
		const Month = name.charAt(0).toUpperCase() + name.slice(1);

		// Create Income / Expenses Collections
		await setDoc(doc(db, `Users/${user.uid}/Transactions/Income`), {
			[Month]: [],
		});

		await setDoc(doc(db, `Users/${user.uid}/Transactions/Expenses`), {
			[Month]: [],
		});

		console.log('User Creation Successful:');
	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log(`Error ${errorCode}:`, errorMessage);
	}
};

// Sign In Existing Users
export const SignIn = async (auth: any, email: string, password: string) => {
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			console.log(`Sign In Successful:`, user);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(`Error ${errorCode}:`, errorMessage);
			alert('Invalid Credentials');
		});
};
