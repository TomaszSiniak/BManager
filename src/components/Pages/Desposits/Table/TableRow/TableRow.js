import React from 'react';
import DeleteIcon from '../../../../../assets/images/trash.svg';
import styles from '../../../../../styles/main.scss';

const TableRow = props => {

  const removeDeposit = () => {
    props.removeDeposit(props.item.id)
  }

  const { amount, bankName, startDate, percentage } = props.item;

  const parsedStartDate = new Date(startDate).toLocaleDateString();

  return (
    <div className={styles.TableRow}>
      <div className={styles.TableRowInfo}>{bankName}</div>
      <div className={styles.TableRowInfo}>{parsedStartDate}</div>

      <div className={styles.TableRowInfo}>{percentage} %</div>
      <div className={styles.TableRowInfo}>{amount}</div>
      <figure className={styles.DeleteIconWrapper} onClick={removeDeposit}>
        <img src={DeleteIcon} alt='' />
      </figure>
    </div>

  )

}


export default TableRow; 