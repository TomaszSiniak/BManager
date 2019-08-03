export const LOAD_BANKS_LIST = 'LOAD_BANKS_LIST';
export const ADD_BANK = 'ADD_BANK';
export const ADD_BANK_ERROR = 'ADD_BANK_ERROR';
export const REMOVE_BANK = 'REMOVE_BANK';
export const REMOVE_BANK_ERROR = 'REMOVE_BANK_ERROR';

export const loadBankList = (userId, data) => {
  return (dispatch, getState, { getFirestore }) => {
    //nie działa
    // const firestore = getFirestore();

    // firestore.collection('banks').where('authorId','==', `${userId}`)
    //   .get()
    //   .then(res => {
    //     console.log(res)
    //     dispatch({ type: LOAD_BANKS_LIST });
    //   })
    //   .catch(err => console.log(err))
  }
}

export const addBank = data => {
  return (dispatch, getState, { getFirestore }) => {

    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    const bankData = {
      ...data,
      authorId,
      authorFirstName: profile.firstName,
    }

    firestore.collection('banks').add(bankData)
      .then((res) => {
        const data = { ...bankData, bankId: res.id }
        dispatch({ type: ADD_BANK, data })
      }).catch(err => {
        dispatch({ type: ADD_BANK_ERROR, err })
      })
  }
}

export const removeBank = (id, bankName) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('banks').doc(id).delete()
      .then(() => {
        dispatch({ type: REMOVE_BANK })
      })
      .catch(error => {
        dispatch({ REMOVE_BANK_ERROR, error })
      })

    // usuwanie kont w usunietym banku
    firestore.collection('accounts').where('bankId', '==', `${id}`).get()
      .then(querySnapshot => {
        const batch = firestore.batch();
        querySnapshot.forEach(doc => {
          batch.delete(doc.ref);
        });
        return batch.commit();
      })
      .catch(err => console.log(err))
  }
}