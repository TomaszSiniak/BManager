import React, { Component } from 'react';
import TableRow from './TableRow/TableRow';
import styles from './table.scss';

class Table extends Component {
  render() {
    const { items, source, togglePromptModal, setIdToRemove } = this.props;
    return (
      <div className={styles.Table}>
        <div className={styles.TableHeaderRow}>
          <div className={styles.TableColumn}>Bank</div>
          <div className={styles.TableColumn}>Data otwarcia</div>
          <div className={styles.TableColumn}>Status</div>
          <div className={styles.TableColumn}>Zysk</div>
      
        </div>
        {items.map(item => {
          return (
            <TableRow
              item={item}
              key={item.id}
              source={source}
              togglePromptModal={togglePromptModal}
              setIdToRemove={setIdToRemove}
            />
          )
        })}
      </div>
    )
  }
}

export default Table;
