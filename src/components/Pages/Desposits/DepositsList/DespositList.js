import React, { Component } from 'react';
import Table from '../Table/Table';
import { addDeposit, toggleSidepane, removeDeposit } from '../../../../store/actions/depositActions';
import DepositSidepane from '../DepositSidepane/DepositSidepane';
import CircleAddButton from '../../../../common/components/CircleAddButton/CircleAddButton';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { get } from 'lodash';
import styles from './despositsList.scss';

class DespositList extends Component {

  render () {
    const { addNewDeposit, isDepositSidepaneOpen, deposits, toggleSidepane, removeDeposit } = this.props;
    return (
      <div className={styles.BankDepositsWrapper}>
        <div className={styles.DespositTitle}>Lokaty</div>
        <div className={styles.DepositsListTitle}>
          {deposits.length > 0 ? <Table items={deposits} removeDeposit={removeDeposit} /> : 'Nie posiadasz żadnych lokat...'}
        </div>
        {isDepositSidepaneOpen && <DepositSidepane addNewDeposit={addNewDeposit} toggleSidepane={toggleSidepane} />}
        <CircleAddButton toggleSidepane={toggleSidepane} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const deposits = get(state.firestore.ordered, 'deposits', []);
  return {
    id: state.firebase.auth.uid,
    deposits,
    isDepositSidepaneOpen: state.deposits.isDepositSidepaneOpen,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewDeposit: data => dispatch(addDeposit(data)),
    toggleSidepane: () => dispatch(toggleSidepane()),
    removeDeposit: id => dispatch(removeDeposit(id))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [
    {
      'collection': 'deposits',
      where: [
        ['authorId', '==', `${props.id}`],
      ],
    }
  ])
)(DespositList);

