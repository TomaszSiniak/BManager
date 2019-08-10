import React, { Component } from 'react';
import EditAccountModal from '../../../Modal/EditAccount/EditAccount';
import AddPromotionConditionModal from '../../../Modal/AddPromotionCondition/AddPromotionCondition';
import Portal from '../../../Portal/Modal';
import Tile from '../ConditionTile/ConditionTile';
import { removePromotionCondition, updateConditionStatus } from '../../../../store/actions/conditionActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { get } from 'lodash';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styles from './accountDetails.scss';

class AccountDetails extends Component {
  state= {
    isEditModlaOpen: false,
    isTermPromotionsModalOpen: false,
  }

  handleEditModal = () => {
    this.setState({
      isEditModalOpen: !this.state.isEditModalOpen
    })
  }

  handleTermPromotionsModal = () => {
    this.setState({
      isTermPromotionsModalOpen: !this.state.isTermPromotionsModalOpen,
    })
  }

  render() {
    const { account: { accountName, status, openDate, totalPrize}, auth , conditions, removeCondition, updateConditionStatus } = this.props;
    if(!auth.uid) return <Redirect to="/login" />
    return (
      <div>
        <div>
          <div className={styles.DetailsRow}>Name: {accountName}</div>
          <div className={styles.DetailsRow}>Status: {status}</div>
          <div className={styles.DetailsRow}>Open date: {openDate}</div>
          { totalPrize &&<div className={styles.DetailsRow}>Promotion award in total: {totalPrize} pln</div>}
          <button onClick={this.handleEditModal} className={styles.EditBtn}>Edit</button>
        </div>
        <div className={styles.ButtonWrapper}>
          <button className={styles.AddPromotionBtn} onClick={this.handleTermPromotionsModal}>Add term of promotions</button>
        </div>
        <div>
          {conditions.map(item => {
            return <Tile item={item} key={item.id} removeCondition={removeCondition}  updateConditionStatus={updateConditionStatus}/>
          })}
        </div>
        {this.state.isEditModalOpen && (
          <Portal>
            <EditAccountModal item ={this.props.account} closeModal={this.handleEditModal} match={this.props.match} />
          </Portal>
        )}
        {this.state.isTermPromotionsModalOpen && (
          <Portal>
            <AddPromotionConditionModal item={this.props.account} closeModal={this.handleTermPromotionsModal} match={this.props.match} />
          </Portal>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeCondition: id => dispatch(removePromotionCondition(id)),
    updateConditionStatus: (id, data) => dispatch(updateConditionStatus(id, data))
  }
}

const mapStateToProps = (state, props)=> {
  const accountId = get(props, 'match.params.accountId', '');
  const accounts = get(state.firestore.ordered, 'accounts', []);
  const account = accounts.length > 0 && accounts.find(item => item.id === accountId)
  const conditions = get(state.firestore.ordered, 'conditions', []);
  return {
    account,
    auth: state.firebase.auth,
    conditions,
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{'collection':'accounts'}, {'collection':'conditions'}])
)(AccountDetails);