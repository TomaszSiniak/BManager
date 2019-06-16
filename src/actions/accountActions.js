export const ADD_BANK = 'ADD_BANK';
export const REMOVE_BANK = 'REMOVE_BANK';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';


export const addBank = data => {
  return {
    type: 'ADD_BANK',
    data,
  }
}

export const removeBank = id => {
  return {
    type: 'REMOVE_BANK',
    id,
  }
}

export const addAccount = (bankName, data) => {
  return {
    type: 'ADD_ACCOUNT',
    bankName,
    data,
  }
}

export const removeAccount = (id, name) => {
  return {
    type: 'REMOVE_ACCOUNT',
    id,
    name,
  }
}