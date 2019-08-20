
import React from 'react';
import DatePicker from '../../../common/components/DatePicker/DatePicker';
import styles from './addItemInput.scss';

const AddItemInput = (props) => {
  const { addAction, buttonText, handleInput, buttonDisabled, placeholder, startDate, handlePickerDate, error } = props;
  return (
    <form onSubmit={addAction} className={styles.AddItemForm}>
      <div className={styles.AddItemHalfWrapper}>
        <input onChange={(e) => handleInput(e)} className={styles.AddItemInput} maxLength="20" placeholder={placeholder} />
        {error && <span>{error}</span>}
      </div>
      <div className={styles.AddItemHalfWrapper}>
      <div className={styles.AddItemDateTitle}>Data otwarcia:</div>
        <DatePicker startDate={startDate} handlePickerDate={handlePickerDate} />
      </div>
      <button disabled={buttonDisabled()} className={styles.AddItemBtn}>{buttonText}</button>
    </form>
  );
}

export default AddItemInput;