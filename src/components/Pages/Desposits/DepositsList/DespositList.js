import React, { Component } from 'react';
import DepositTile from '../DepositTile/DepositTile';
import { addDeposit, toggleDepositSidepane } from '../../../../store/actions/depositActions';
import DepositForm from '../DepositForm/DepositForm';
import PlusIcon from '../../../../assets/images/plus.svg';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { get } from 'lodash';
import styles from './despositsList.scss';

class DespositList extends Component {

  render () {
    const { addNewDeposit, isDepositSidepaneOpen, openSidepane } = this.props;
    return (
      <div className={styles.BankDepositsWrapper}>
        <div className={styles.DespositTitle}>Bank Deposits</div>
        <div className={styles.DepositsListTitle}>Your deposits list:</div>
        <div className={styles.DepositsList}>
          {this.props.deposits.map(item => {
            return <DepositTile item={item} key={item.id} />
          })}
        </div>
        {isDepositSidepaneOpen && <DepositForm addNewDeposit={addNewDeposit} toggleSidepane={openSidepane} />}
        <button className={styles.AddDepositBtn} onClick={openSidepane}>
          <img src={PlusIcon} alt="" />
        </button>
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
    openSidepane: () => dispatch(toggleDepositSidepane())
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

