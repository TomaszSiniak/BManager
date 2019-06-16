import React, { Component } from 'react';
import EditAccountModal from '../../../Modal/EditAccount/EditAccount';
import Portal from '../../../Portal/Modal'; 
import { connect } from 'react-redux';
import { get } from 'lodash';

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
    const { accountName, status, openDate } = this.props.account[0];
    return (
      <div>
        <div>Nazwa: {accountName}</div>
        <div>Status: {status}</div>
        <div>Data Otwarcia: {openDate}</div>
        <button onClick={this.handleEditModal}>Edytuj</button>
        {this.state.isEditModalOpen && (
          <Portal>
            <EditAccountModal item ={this.props.account[0]} closeModal={this.handleEditModal} />
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
  const accountId = get(props, 'match.params.accountId', {});
  const name = get(props, 'match.params.bankName', 'default name');
  return {
    account: state.accounts.bankList.map(item => {
      if(item.bankName === name){
        return item.accounts.find(account => account.id === accountId);
      }
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails);