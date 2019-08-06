
import React from 'react';
import styles from './addItemInput.scss';

const AddItemInput = (props) =>{
  const { addAction, buttonText, handleInput, buttonDisabled, placeholder } = props;

  return (
    <form onSubmit={addAction} className={styles.AddItemForm}>
      <input onChange={(e) => handleInput(e)} className={styles.AddItemInput} maxLength="20" placeholder={placeholder} />
      <button disabled={buttonDisabled()} className={styles.AddItemBtn}>{buttonText}</button>
    </form>
  );
}
 
export default AddItemInput;