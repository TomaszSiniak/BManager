
import React from 'react';
import styles from './addItemInput.scss';

const AddItemInput = (props) =>{
  const { addAction, buttonText, handleInput, buttonDisabled } = props;

  return (
    <form onSubmit={addAction} className={styles.AddItemForm}>
      <input onChange={(e) => handleInput(e)} className={styles.AddItemInput} maxLength="15"/>
      <button disabled={buttonDisabled()} className={styles.AddItemBtn}>{buttonText}</button>
    </form>
  );
}
 
export default AddItemInput;