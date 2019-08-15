export const ADD_DEPOSIT = 'ADD_DEPOSIT';
export const ADD_DEPOSIT_ERROR = 'ADD_DEPOSIT_ERROR';


export const addDeposit = data => {
  return (dispatch, getState, { getFirestore }) => {

    const firestore = getFirestore();

    const deposit = {
      ...data,
      authorId: getState().firebase.auth.uid,
    };

    firestore.collection('deposits').add(deposit)
      .then(() => {
        dispatch({ type: ADD_DEPOSIT, deposit })
      })
      .catch(err => {
        dispatch({ type: ADD_DEPOSIT_ERROR, err })
      });
  }
}

// export const removePromotionCondition = id => {
//   return (dispatch, getState, { getFirestore }) => {
//     const firestore = getFirestore();

//     firestore.collection('conditions').doc(id).delete()
//       .then(() => {
//         dispatch({ type: REMOVE_PROMOTION_CONDITION, id })
//       })
//       .catch(err => {
//         dispatch({ type: REMOVE_PROMOTION_CONDITION_ERROR, err })
//       });
//   }
// }

