import React, { Component } from 'react';
import EditAccountModal from '../../../Modal/EditAccount/EditAccount';
import Portal from '../../../Portal/Modal';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { get } from 'lodash';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styles from './accountDetails.scss';

class AccountDetails extends Component {
  state= {
    isEditModlaOpen: false,
  }

  handleEditModal = () => {
    this.setState({
      isEditModalOpen: !this.state.isEditModalOpen
    })
  }

  render() {
    const { accountName, status, openDate, totalPrize } = this.props.account;
    const { auth } = this.props;
    if(!auth.uid) return <Redirect to="/login" />
    return (
      <div>
        <div>
          <div className={styles.DetailsRow}>Nazwa: {accountName}</div>
          <div className={styles.DetailsRow}>Status: {status}</div>
          <div className={styles.DetailsRow}>Data otwarcia: {openDate}</div>
          {totalPrize &&
            <div className={styles.DetailsRow}>Nagroda za konto: {totalPrize}
            </div>
          }
          <button onClick={this.handleEditModal} className={styles.EditBtn}>Edytuj</button>
        </div>
        <div className={styles.ButtonWrapper}>
          <button className={styles.AddPromotionBtn}>Dodaj warunek promocji konta</button>
        </div>
        {this.state.isEditModalOpen && (
          <Portal>
            <EditAccountModal item ={this.props.account} closeModal={this.handleEditModal} match={this.props.match} />
          </Portal>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dupa: () => console.log('dupa')
  }
}

const mapStateToProps = (state, props)=> {
  const accountId = get(props, 'match.params.accountId', '');
  const accounts = get(state.firestore.ordered, 'accounts', []);
  const account = accounts.length > 0 && accounts.find(item => item.id === accountId)
  return {
    account: account,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{'collection':'accounts'}])
)(AccountDetails);