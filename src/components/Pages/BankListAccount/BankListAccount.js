import React, { Component } from 'react';
import AddItemInput from '../../../common/components/AddItemInput/AddItemInput';
import AccountListItem from '../../../components/Pages/Accounts/AccountListItem/AccountListItem';
import { addAccount, removeAccount } from '../../../store/actions/accountActions';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from './bankListAccounts.scss';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class BankListAccount extends Component {
  state = {
    accountName: null,
    openDate: null,
    status: 'aktywne',
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
    }
    
    // this.props.addAccount(data, this.props.match.params.bankName);

    const checkAccount = this.checkAccountExist(this.state.accountName);
    if (!checkAccount) {
      this.props.addAccount(data, this.props.match.params.bankName);
    }
  }

  checkAccountExist = (name) => {
    let result = false;
    const accounts = get(this.props, 'accountsList', [])
    accounts.find(item => {
      if (item.accountName.toLowerCase() === name.toLowerCase()) {
        result = true;
      }
    })
    return result
  }

  buttonDisabled = () => {
    const accountName = get(this.state, 'accountName', null);
    const openDate = get(this.state, 'openDate', null);
    if (!accountName) {
      return true
    }
    return false;
  }

  render () {
    const buttonText = "Dodaj nowe konto";
    const placeholderText = "Nazwa konta";
    const { accountsList, auth } = this.props;
    if (!auth.uid) return <Redirect to='/login' />
    return (
      <div>
        <div className={styles.BankName}>{this.props.match.params.bankName}</div>
        <AddItemInput
          buttonText={buttonText}
          addAction={this.onSubmit}
          handleInput={this.handleBankNameInput}
          buttonDisabled={this.buttonDisabled}
          placeholder={placeholderText}
        />

        {accountsList.length === 0 ?
          (<div className={styles.EmptyAccountListInfo}>Nie masz żadnych kont w tym banku...</div>)
          :
          (<div className={styles.AccountListTitle}>Twoje konta:</div>)
        }
        <div>
          {accountsList.map(item => {
            return (
              <AccountListItem
                item={item}
                key={item.id}
                remove={this.props.remove}
                name={this.props.match.params.bankName}
              />
            )
          })}

        </div>

      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  const id = state.firebase.auth.uid;
  const accounts = get(state.firestore.ordered, 'accounts', []);
  const name = get(props, 'match.params.bankName', '');
  const filterById = accounts.filter(item => item.authorId === id);
  const filteredAccounts = filterById.filter(item => item.bankName.toLowerCase() === name.toLowerCase());
  return {
    accountsList: filteredAccounts,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAccount: (data, name) => dispatch(addAccount(data, name)),
    remove: (id, name) => dispatch(removeAccount(id, name))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ 'collection': 'accounts' }])
)(BankListAccount);