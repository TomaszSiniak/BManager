export const ADD_CREDIT_CARD = 'ADD_CREDIT_CARD';
export const ADD_CREDIT_CARD_ERROR = 'ADD_CREDIT_CARD_ERROR';
export const REMOVE_CREDIT_CARD = 'REMOVE_CREDIT_CARD';
export const REMOVE_CREDIT_CARD_ERROR = 'REMOVE_CREDIT_CARD_ERROR';
export const UPDATE_CREDIT_CARD = 'UPDATE_CREDIT_CARD_ERROR';
export const UPDATE_CREDIT_CARD_ERROR = 'UPDATE_CREDIT_CARD_ERROR';
export const TOGGLE_CREDIT_CARD_SIDEPANE = 'TOGGLE_CREDIT_CARD_SIDEPANE';

export const addCreditCard = data => {
  return(dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const card = {
      ...data,
      authorId: getState().firebase.auth.uid,
    }

    firestore.collection('creditCards').add(card)
      .then(() => {
        dispatch({ type: ADD_CREDIT_CARD})
      })
      .catch(error => {
        dispatch({ type: ADD_CREDIT_CARD_ERROR, error})
      })
  }
}

export const removeCreditCard = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('creditCards').doc(id).delete()
      .then(() => {
        dispatch({ type: REMOVE_CREDIT_CARD})
      })
      .catch(err => {
        dispatch({ type: REMOVE_CREDIT_CARD_ERROR, err})
      })
  }
}

export const updateCreditCard = (id, data) => {
  return(dispatch, getState, { getFirestore }) => {

    const firestore = getFirestore();

    const { name, status, award, achievedAward } = data;

    firestore.collection('creditCards').doc(id).update({
      name,
      status,
      award,
      achievedAward
    })
      .then(() => {
        dispatch({ type: UPDATE_CREDIT_CARD})
      })
      .catch(err => {
        dispatch({ type: UPDATE_CREDIT_CARD_ERROR, err})
      })
  }
}

export const toggleSidepane = () => {
  return {
    type: TOGGLE_CREDIT_CARD_SIDEPANE
  }
}
