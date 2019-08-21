export const ADD_DEPOSIT = 'ADD_DEPOSIT';
export const ADD_DEPOSIT_ERROR = 'ADD_DEPOSIT_ERROR';
export const TOGGLE_DEPOSIT_SIDEPANE = 'TOGGLE_DEPOSIT_SIDEPANE';
export const REMOVE_DEPOSIT = 'REMOVE_DEPOSIT';
export const REMOVE_DEPOSIT_ERROR = 'REMOVE_DEPOSIT_ERROR';
export const TOGGLE_SIDEPANE = 'TOGGLE_SIDEPANE';



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

export const removeDeposit = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('deposits').doc(id).delete()
      .then(() => {
        dispatch({ type: REMOVE_DEPOSIT, id })
      })
      .catch(err => {
        dispatch({ type: REMOVE_DEPOSIT_ERROR, err })
      });
  }
}

export const toggleSidepane = () => {
  return {
    type: TOGGLE_SIDEPANE
  }
}

