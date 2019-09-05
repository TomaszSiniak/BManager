import React from 'react';
import TableRow from './TableRow/TableRow';
import styles from '../../../../styles/main.scss';

const Table = props => {
  const{ items, setIdToRemove, togglePromptModal, updateConditionStatus } = props;
    return (
      <div className={styles.Table}>
        <div className={styles.TableHeaderRow}>
          <div className={styles.TableColumn}>Warunek</div>
          <div className={styles.TableColumn}>Termin</div>
          <div className={styles.TableColumn}>Status</div>
        </div>
        {items.map(item => {
          return (
            <TableRow
              item={item}
              key={item.id}
              togglePromptModal={togglePromptModal}
              setIdToRemove={setIdToRemove}
              updateConditionStatus={updateConditionStatus}
            />
          )
        })}
        {items.length === 0 && <div className={styles.TableNoDataInfo}>Lista jest pusta...</div>}
      </div>
    )
}

export default Table;