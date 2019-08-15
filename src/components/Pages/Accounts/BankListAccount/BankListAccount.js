import React, { Component } from 'react';
import AddItemInput from '../../../../common/components/AddItemInput/AddItemInput';
import AccountListItem from '../AccountListItem/AccountListItem';
import { addBankAccount, removeBankAccount } from '../../../../store/actions/accountActions';
import { togglePromptModal } from '../../../../store/actions/appActions';
import Portal from '../../../Portal/Modal';
import PromptModal from '../../../Modal/Prompt/Prompt';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from './bankListAccounts.scss';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class BankListAccount extends Component {
  state = {
    accountName: null,
    openDate: "2019-06-20",
    status: 'active',
  }

  handleBankNameInput = (e) => {
    const accountName = e.target.value.trim();
    this.setState({
      accountName,
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      accountName: this.state.accountName,
      status: this.state.status,
      openDate: this.state.openDate,
      bankId: this.props.bankId,
    }

    const checkAccount = this.checkAccountExist(this.state.accountName);
    if (!checkAccount) this.props.addBankAccount(data, this.props.match.params.bankName);
  }

  checkAccountExist = (name) => {
    let result = false;
    const accounts = get(this.props, 'accountsList', [])
    accounts.find(item => {
      if (item.accountName.toLowerCase() === name.toLowerCase()) result = true })
    return result
  }

  buttonDisabled = () => {
    const accountName = get(this.state, 'accountName', null);
    const openDate = get(this.state, 'openDate', null);
    if (!accountName) return true;
    return false;
  }

  setIdToRemove = id => {
    this.setState({
      removeId: id,
    })
  }

  render () {
    const buttonText = "Add account";
    const placeholderText = "Enter account name...";
    const { accountsList, auth, isPromptModalVisible } = this.props;
    
    if (!auth.uid) return <Redirect to='/login' />
    return (
      <div className={styles.ContentWrapper}>
        <div className={styles.BankName}>{this.props.match.params.bankName}</div>
        <AddItemInput
          buttonText={buttonText}
          addAction={this.onSubmit}
          handleInput={this.handleBankNameInput}
          buttonDisabled={this.buttonDisabled}
          placeholder={placeholderText}
        />

        {accountsList.length === 0 ?
          (<div className={styles.EmptyAccountListInfo}>You have no accounts in this bank...</div>)
          :
          (<div className={styles.AccountListTitle}>Your Accounts:</div>)
        }
        <div>
          {accountsList.map(item => {
            return (
              <AccountListItem
                item={item}
                key={item.id}
                name={this.props.match.params.bankName}
                togglePromptModal= {this.props.togglePromptModal}
                setIdToRemove={this.setIdToRemove}
              />
            )
          })}
        </div>
        {this.props.isPromptModalVisible && (
            <Portal>
              <PromptModal
                removeId={this.state.removeId}
                remove={this.props.removeBankAccount}
                togglePromptModal={this.props.togglePromptModal}
              />
            </Portal>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const accounts = get(state.firestore.ordered, 'accounts', []);
  const bankId = get(state.firestore.ordered, 'banks[0].id', null);
  return {
    accountsList: accounts,
    auth: state.firebase.auth,
    userId: state.firebase.auth.uid,
    bankId: bankId,
    isPromptModalVisible: state.app.isPromptModalVisible,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addBankAccount: (data, name) => dispatch(addBankAccount(data, name)),
    removeBankAccount: (id, name) => dispatch(removeBankAccount(id, name)),
    togglePromptModal: () => dispatch(togglePromptModal())
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [
    { collection: 'accounts',
      where: [
        ['authorId', '==', `${props.userId}`],
        ['bankName', '==', `${props.match.params.bankName}`]
      ],
    },
    { collection: 'banks',
      where: [
        ['authorId', '==', `${props.userId}`],
        ['bankName', '==', `${props.match.params.bankName}`]
      ],
    },
  ])
)(BankListAccount);