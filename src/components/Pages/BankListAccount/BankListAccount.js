import React, { Component } from 'react';
import AddItemInput from '../../../common/components/AddItemInput/AddItemInput';
import AccountListItem from '../../../components/Pages/Accounts/AccountListItem/AccountListItem';
import uuid from 'uuid';
import { addAccount, removeAccount } from '../../../actions/accountActions';
import { get } from 'lodash';
import { connect } from 'react-redux';
import styles from './bankListAccounts.scss';

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
      id: uuid(),
      accountName: this.state.accountName,
      status: this.state.status,
      openDate: this.state.openDate,
    }

    const checkAccount = this.checkAccountExist(this.state.accountName);
    if (!checkAccount) {
      this.props.addAccount(this.props.match.params.bankName, data);
    }
  }

  checkAccountExist = (name) => {
    let result = false;
    const accounts = get(this.state, 'data.accounts', [])
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
    const { accountsList } = this.props;
    return (
      <div>
        <div className={styles.BankName}>{this.props.match.params.bankName}</div>
        <AddItemInput
          buttonText={buttonText}
          addAction={this.onSubmit}
          handleInput={this.handleBankNameInput}
          buttonDisabled={this.buttonDisabled}
        />
        {accountsList.accounts.length === 0 ?
          (<div className={styles.EmptyAccountListInfo}>Nie masz żadnych kont w tym banku...</div>)
          :
          (<div className={styles.AccountListTitle}>Twoje konta:</div>)
        }
        <div>
          {accountsList.accounts.map(item => {
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
  const name = get(props, 'match.params.bankName', null)
  return {
    accountsList: name ? state.accounts.bankList.find(item => item.bankName === name) : {},
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAccount: (name, data) => dispatch(addAccount(name, data)),
    remove: (id, name) => dispatch(removeAccount(id, name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankListAccount);