import React from 'react';
import PastTransactions from '../../Components/Transactions/PastTransactions';

type Props = {};

function Transactions({}: Props) {
	// const AddFavourite = async (Item: object) => {
	// 	// Add To DB

	// 	if (user) {
	// 		const UserDB = doc(db, `Users/${user.uid}/MoreInfo/Lists`);
	// 		await updateDoc(UserDB, {
	// 			Favourites: arrayUnion(Item),
	// 		});
	// 		console.log('Item Added To Favourites');
	// 		PullLists();
	// 		handleClose();
	// 	}
	// };
	return (
		<div>
			<PastTransactions />
		</div>
	);
}

export default Transactions;
