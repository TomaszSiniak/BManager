import React, { Component } from 'react';
import TableRow from './TableRow/TableRow';
import styles from './table.scss';

class Table extends Component {
  render() {
    const { items, removeDeposit } = this.props;
    return (
      <div className={styles.Table}>
        <div className={styles.TableHeaderRow}>
          <div className={styles.TableColumn}>Bank</div>
          <div className={styles.TableColumn}>Koniec</div>
          <div className={styles.TableColumn}>Procent</div>
          <div className={styles.TableColumn}>Kwota</div>
        </div>
        {items.map(item => {
          return (
            <TableRow
              item={item}
              key={item.id}
              removeDeposit={removeDeposit}
            />
          )
        })}
      </div>
    )
  }
}

export default Table;
