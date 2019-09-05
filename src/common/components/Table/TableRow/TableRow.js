import React from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '../../../../assets/images/trash.svg';
import styles from '../../../../styles/main.scss';

const TableRow = props => {

  const handlePromptModal = e => {
    e.preventDefault();
    props.setIdToRemove(props.item.id)
    props.togglePromptModal();
  }
  const source = props.source.substr(1);
  const { status, bankName, startDate } = props.item;
  const parsedStartDate = new Date(startDate).toLocaleDateString();
  return (
    <Link to={`/${source}/${props.item.id}`} className={styles.TableRow}>
      <div className={styles.TableRowInfo}>{bankName}</div>
      <div className={styles.TableRowInfo}>{parsedStartDate}</div>

      <div className={styles.TableRowInfo}>{status === 'active' ? (<span className={styles.DotActive} />) : (<span className={styles.DotInactive} />)}</div>
      <div className={styles.TableRowInfo}>6876,76 pln</div>
      <figure className={styles.DeleteIconWrapper} onClick={handlePromptModal}>
        <img src={DeleteIcon} alt='' />
      </figure>
    </Link>

  )

}


export default TableRow; 