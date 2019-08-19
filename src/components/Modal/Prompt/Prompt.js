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
        <div className={styles.Title}>Potwierdzenie akcji</div>
        <div className={styles.Subtitle}>Czy na pewno chcesz usunąć tą pozycję z listy ?</div>
        <div className={styles.ButtonsWrapper}>
          <button className={styles.PromptBtnRemove} onClick={handleRemoveItem}>Tak, usuń</button>
          <button className={styles.PromptBtn} onClick={props.togglePromptModal}>Anuluj</button>
        </div>
      </div>
    </div>
  )
}

export default PromptModal;