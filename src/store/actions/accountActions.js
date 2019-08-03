export const ADD_BANK_ACCOUNT = 'ADD_BANK_ACCOUNT';
export const ADD_BANK_ACCOUNT_ERROR = 'ADD_BANK_ACCOUNT_ERROR';
export const REMOVE_BANK_ACCOUNT = 'REMOVE_BANK__ACCOUNT';
export const REMOVE_BANK_ACCOUNT_ERROR = 'REMOVE_BANK__BANK_ERROR';
export const UPDATE_BANK_ACCOUNT = 'UPDATE_BANK_ACCOUNT_ERROR';
export const UPDATE_BANK_ACCOUNT_ERROR = 'UPDATE_BANK_ACCOUNT_ERROR';

export const addBankAccount = (data, bankName) => {
  return(dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const account = {
      ...data,
      authorId: getState().firebase.auth.uid,
      bankName,
    }

    firestore.collection('accounts').add(account)
      .then(() => {
        dispatch({ type: ADD_BANK_ACCOUNT})
      })
      .catch(error => {
        dispatch({ type: ADD_BANK_ACCOUNT_ERROR, error})
      })
  }
}

export const removeBankAccount = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('accounts').doc(id).delete()
      .then(() => {
        dispatch({ type: REMOVE_BANK_ACCOUNT})
      })
      .catch(err => {
        dispatch({ type: REMOVE_BANK_ACCOUNT_ERROR, err})
      })
  }
}

export const updateBankAccount = (id, data) => {
  return(dispatch, getState, { getFirestore }) => {

    const firestore = getFirestore();

    const { accountName, status, totalPrize } = data;

    firestore.collection('accounts').doc(id).update({
      accountName,
      status,
      totalPrize,
    })
      .then(() => {
        dispatch({ type: UPDATE_BANK_ACCOUNT})
      })
      .catch(err => {
        dispatch({ type: UPDATE_BANK_ACCOUNT_ERROR, err})
      })
  }
}
