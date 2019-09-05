import React from 'react';
import DeleteIcon from '../../../../../assets/images/trash.svg';
import Switch from 'react-switch';
import styles from '../../../../../styles/main.scss';

const TableRow = props => {

  const setIdToRemove = () => {
    props.togglePromptModal();
    props.setIdToRemove(props.item.id);
  }

  const handleSwitcher = () => {
    const { item } = props;
    props.updateConditionStatus(item.id, !item.status);
  };

  const { conditionEndDate, conditionName, status } = props.item;

  const parsedStartDate = new Date(conditionEndDate).toLocaleDateString();

  return (
    <div className={styles.TableRow}>
      <div className={styles.TableRowInfo}>{conditionName}</div>
      <div className={styles.TableRowInfo}>{parsedStartDate}</div>
      <div className={styles.TableRowInfo}>
        {status}
        <Switch
          height={15}
          width={30}
          onColor='#06cc66'
          offColor='#ed3157'
          onChange={handleSwitcher}
          checked={status}
        />
      </div>
      <figure className={styles.DeleteIconWrapper} onClick={setIdToRemove}>
        <img src={DeleteIcon} alt='' />
      </figure>
    </div>

  )

}


export default TableRow; 