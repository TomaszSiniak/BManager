export const ADD_BANK_ACCOUNT = 'ADD_BANK_ACCOUNT';
export const ADD_BANK_ACCOUNT_ERROR = 'ADD_BANK_ACCOUNT_ERROR';
export const REMOVE_BANK_ACCOUNT = 'REMOVE_BANK__ACCOUNT';
export const REMOVE_BANK_ACCOUNT_ERROR = 'REMOVE_BANK__BANK_ERROR';
export const UPDATE_BANK_ACCOUNT = 'UPDATE_BANK_ACCOUNT_ERROR';
export const UPDATE_BANK_ACCOUNT_ERROR = 'UPDATE_BANK_ACCOUNT_ERROR';
export const TOGGLE_ACCOUNT_SIDEPANE = 'TOGGLE_ACCOUNT_SIDEPANE';
// promotion condition
export const ADD_PROMOTION_CONDITION = 'ADD_PROMOTION_CONDITION';
export const ADD_PROMOTION_CONDITION_ERROR = 'ADD_PROMOTION_CONDITION_ERROR';
export const REMOVE_PROMOTION_CONDITION = 'REMOVE_PROMOTION_CONDITION';
export const REMOVE_PROMOTION_CONDITION_ERROR = 'REMOVE_PROMOTION_CONDITION_ERROR';
export const UPDATE_CONDITION_STATUS = 'UPDATE_CONDITION_STATUS';
export const UPDATE_CONDITION_STATUS_ERROR = 'UPDATE_CONDITION_STATUS_ERROR';
// income profit
export const ADD_ACCOUNT_INCOME = 'ADD_ACCOUNT_INCOME';
export const ADD_ACCOUNT_INCOME_ERROR = 'ADD_ACCOUNT_INCOME_ERROR';
export const REMOVE_ACCOUNT_INCOME = 'REMOVE_ACCOUNT_INCOME';
export const REMOVE_ACCOUNT_INCOME_ERROR = 'REMOVE_ACCOUNT_INCOME_ERROR';

export const addBankAccount = data => {
  return(dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const account = {
      ...data,
      authorId: getState().firebase.auth.uid,
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

       // usuwanie warunków promocji powiązanych z usunietym kontem
    firestore.collection('conditions').where('accountId', '==', `${id}`).get()
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

export const updateBankAccount = (id, data) => {
  return(dispatch, getState, { getFirestore }) => {

    const firestore = getFirestore();

    const { name, status, award, achievedAward } = data;

    firestore.collection('accounts').doc(id).update({
      name,
      status,
      award,
      achievedAward
    })
      .then(() => {
        dispatch({ type: UPDATE_BANK_ACCOUNT})
      })
      .catch(err => {
        dispatch({ type: UPDATE_BANK_ACCOUNT_ERROR, err})
      })
  }
}

export const toggleSidepane = () => {
  return {
    type: TOGGLE_ACCOUNT_SIDEPANE
  }
}


export const addPromotionCondition = data => {
  return (dispatch, getState, { getFirestore }) => {

    const firestore = getFirestore();

    firestore.collection('conditions').add(data)
      .then(() => {
        dispatch({ type: ADD_PROMOTION_CONDITION, data })
      })
      .catch(err => {
        dispatch({ type: ADD_PROMOTION_CONDITION_ERROR, err })
      });
  }
}

export const removePromotionCondition = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('conditions').doc(id).delete()
      .then(() => {
        dispatch({ type: REMOVE_PROMOTION_CONDITION, id })
      })
      .catch(err => {
        dispatch({ type: REMOVE_PROMOTION_CONDITION_ERROR, err })
      });
  }
}

export const updateConditionStatus = (id, status) => {
  return (dispatch, getState, { getFirestore }) => {

    const firestore = getFirestore();
   
    firestore.collection('conditions').doc(id).update({
      status
    }).then(() => {
      dispatch({ type: UPDATE_CONDITION_STATUS })
    }).catch(err => {
      dispatch({ type: UPDATE_CONDITION_STATUS_ERROR, err})
    })
  }
}

