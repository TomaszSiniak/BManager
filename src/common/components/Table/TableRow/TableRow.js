import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '../../../../assets/images/trash.svg';
import styles from './tableRow.scss';
import stylesMain from '../../../../styles/main.scss';

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

      <div className={styles.TableRowInfo}>{status === 'active' ? (<span className={stylesMain.DotActive} />) : (<span className={stylesMain.DotInactive} />)}</div>
      <div className={styles.TableRowInfo}>0</div>
      <figure className={styles.DeleteIconWrapper} onClick={handlePromptModal}>
        <img src={DeleteIcon} alt='' />
      </figure>
    </Link>

  )

}


export default TableRow; 