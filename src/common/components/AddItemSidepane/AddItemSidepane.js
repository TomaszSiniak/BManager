import React from 'react';
import DatePicker from '../DatePicker/DatePicker';
import LogoIcon from '../../../assets/images/logo.png';
import styles from './addItemSidepane.scss';

const AddItemSidepane = props => {
  const closeSidepane = e => {
    const target = e.target.classList.value;
    if (target === 'AddItemSidepaneWrapper--J2h5z') {
      props.toggleSidepane();
    }
  }
  const { addAction, buttonText, handleInput, buttonDisabled, placeholderBankName, placeholderName, startDate, handlePickerDate, error, title } = props;
  return (
    <div className={styles.AddItemSidepaneWrapper} onClick={closeSidepane}>
      <form onSubmit={addAction} className={styles.AddItemForm}>
        <div className={styles.AddItemSidepaneInputWrapper}>
          <figure className={styles.LogoWrapper}>
            <img src={LogoIcon} alt="" />
          </figure>
          <div className={styles.SidepaneTitle}>{title}</div>
          <input onChange={(e) => handleInput(e)} className={styles.AddItemInput} maxLength="20" placeholder={placeholderBankName} name="bankName"/>
          <input onChange={(e) => handleInput(e)} className={styles.AddItemInput} maxLength="20" placeholder={placeholderName} name="name"/>
          {error && <span>{error}</span>}
          <div className={styles.AddItemDateWrapper}>
            <div className={styles.AddItemDateTitle}>Data otwarcia:</div>
            <DatePicker startDate={startDate} handlePickerDate={handlePickerDate} />
          </div>
        </div>
        <button disabled={buttonDisabled()} className={styles.AddItemBtn}>{buttonText}</button>
      </form>
    </div>
  );
}

export default AddItemSidepane;