export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const ADD_ACCOUNT_ERROR = 'ADD_ACCOUNT_ERROR';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';
export const REMOVE_ACCOUNT_ERROR = 'REMOVE_BANK_ERROR';

export const addAccount = (data, bankName) => {
  return(dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const account = {
      ...data,
      authorId: getState().firebase.auth.uid,
      bankName: bankName,
    }

    firestore.collection('accounts').add(account)
      .then(() => {
        dispatch({ type: ADD_ACCOUNT})
      })
      .catch(error => {
        dispatch({ type: ADD_ACCOUNT_ERROR, error})
      })
  }
}

export const removeAccount = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('accounts').doc(id).delete()
      .then(() => {
        dispatch({ type: REMOVE_ACCOUNT})
      })
      .catch(err => {
        dispatch({ type: REMOVE_ACCOUNT_ERROR, err})
      })
  }
}