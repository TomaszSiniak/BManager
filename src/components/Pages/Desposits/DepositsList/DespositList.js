import React, { Component } from 'react';
import DepositTile from '../DepositTile/DepositTile';
import { addDeposit, toggleDepositSidepane, removeDeposit } from '../../../../store/actions/depositActions';
import DepositForm from '../DepositForm/DepositForm';
import CircleAddButton from '../../../../common/components/CircleAddButton/CircleAddButton';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { get } from 'lodash';
import styles from './despositsList.scss';

class DespositList extends Component {

  render () {
    const { addNewDeposit, isDepositSidepaneOpen, deposits, openSidepane, removeDeposit } = this.props;
    return (
      <div className={styles.BankDepositsWrapper}>
        <div className={styles.DespositTitle}>Lokaty</div>
        <div className={styles.DepositsListTitle}>
          {deposits.length > 0 ? 'Twoje lokaty:' : 'Nie posiadasz żadnych lokat...'}
      </div>
       
        <div className={styles.DepositsList}>
          {deposits.map(item => {
            return <DepositTile item={item} key={item.id} removeDeposit={removeDeposit}/>
          })}
        </div>
        {isDepositSidepaneOpen && <DepositForm addNewDeposit={addNewDeposit} toggleSidepane={openSidepane} />}
        <CircleAddButton openSidepane={openSidepane}/>
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
    openSidepane: () => dispatch(toggleDepositSidepane()),
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

