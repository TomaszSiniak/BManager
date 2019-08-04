import React from 'react';
import styles from './prompt.scss';

const PromptModal = (props) => {

  const handleRemoveItem = () => {
    props.remove(props.removeId);
    props.togglePromptModal();
  }
  return (
    <div className={styles.PromptWrapper}>
      <div className={styles.PromptContent}>
        <div className={styles.Title}>Action permission</div>
        <div className={styles.Subtitle}>This action will remove item from your list. Are you sure to continue?</div>
        <div className={styles.ButtonsWrapper}>
          <button className={styles.PromptBtnRemove} onClick={handleRemoveItem}>Yes, delete</button>
          <button className={styles.PromptBtn} onClick={props.togglePromptModal}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default PromptModal;