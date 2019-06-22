import React, { Component } from 'react';
import EditAccountModal from '../../../Modal/EditAccount/EditAccount';
import Portal from '../../../Portal/Modal'; 
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { get } from 'lodash';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

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
    const { accountName, status, openDate } = this.props.account;
    const { auth } = this.props;
    if(!auth.uid) return <Redirect to="/login" />
    return (
      <div>
        <div>Nazwa: {accountName}</div>
        <div>Status: {status}</div>
        <div>Data Otwarcia: {openDate}</div>
        <button onClick={this.handleEditModal}>Edytuj</button>
        {this.state.isEditModalOpen && (
          <Portal>
            <EditAccountModal item ={this.props.account} closeModal={this.handleEditModal} />
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