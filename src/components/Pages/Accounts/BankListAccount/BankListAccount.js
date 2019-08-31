import React, { Component } from 'react';
import AddItemSidepane from '../../../../common/components/AddItemSidepane/AddItemSidepane';
import Card from '../.././../../common/components/Card/Card';
import CircleAddButton from '../../../../common/components/CircleAddButton/CircleAddButton';
import { addBankAccount, removeBankAccount, toggleSidepane } from '../../../../store/actions/accountActions';
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
    name: null,
    status: 'active',
    achievedAward: '0',
    startDate: null,
    award: null,
  }


  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    })
  }

  handleAward = e => {
    const award = e.target.value;
    this.setState({
      award
    })
  }

  onSubmit = e => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      bankName: this.state.bankName,
      status: this.state.status,
      startDate: this.state.startDate,
      award: this.state.award,
      achievedAward: this.state.achievedAward,
    }

    const checkAccount = this.checkAccountExist(this.state.name);
    if (!checkAccount) {
      this.props.addBankAccount(data);
      this.props.toggleSidepane();
    }
  }

  checkAccountExist = name => {
    let result = false;
    const accounts = get(this.props, 'accountsList', [])
    accounts.find(item => {
      if (item.name.toLowerCase() === name.toLowerCase()) result = true
    })
    return result
  }

  buttonDisabled = () => {
    const name = get(this.state, 'name', null);
    const startDate = get(this.state, 'startDate', null);
    if (!name || !startDate) return true;
    return false;
  }

  setIdToRemove = id => {
    this.setState({
      removeId: id,
    })
  }

  handlePickerDate = date => {
    const parsedDate = Date.parse(date);

    this.setState({
      startDate: parsedDate
    });
  }

  render () {
    const title= "Dodawanie konta"
    const buttonText = "Dodaj konto";
    const placeholderBankName = "Wpisz nazwę banku...";
    const placeholderName = "Wpisz nazwę konta...";
    const { accountsList, auth, isSidepaneVisible, toggleSidepane } = this.props;
    const { startDate } = this.state;

    if (!auth.uid) return <Redirect to='/login' />
    return (
      <div className={styles.ContentWrapper}>
        <div className={styles.BankName}>Konta bankowe</div>

        {accountsList.length === 0 ?
          (<div className={styles.EmptyAccountListInfo}>Nie posiadasz kont bankowych...</div>)
          :
          (<div className={styles.AccountListTitle}>Twoje konta:</div>)
        }
        <div className={styles.AccountListWrapper}>
          {accountsList.map(item => {
            return (
              <Card
                item={item}
                key={item.id}
                togglePromptModal={this.props.togglePromptModal}
                setIdToRemove={this.setIdToRemove}
                source={this.props.match.path}
              />
            )
          })}
        </div>
        <CircleAddButton toggleSidepane={toggleSidepane} />
        {isSidepaneVisible && (
          <AddItemSidepane
          title={title}
            buttonText={buttonText}
            addAction={this.onSubmit}
            handleInput={this.handleInputChange}
            handleAward={this.handleAward}
            buttonDisabled={this.buttonDisabled}
            placeholderBankName={placeholderBankName}
            placeholderName={placeholderName}
            startDate={startDate}
            handlePickerDate={this.handlePickerDate}
            toggleSidepane={toggleSidepane}
          />
        )}
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
  return {
    accountsList: accounts,
    auth: state.firebase.auth,
    userId: state.firebase.auth.uid,
    isPromptModalVisible: state.app.isPromptModalVisible,
    isSidepaneVisible: state.bankAccounts.isSidepaneVisible,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addBankAccount: data => dispatch(addBankAccount(data)),
    removeBankAccount: id => dispatch(removeBankAccount(id)),
    togglePromptModal: () => dispatch(togglePromptModal()),
    toggleSidepane: () => dispatch(toggleSidepane())
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [
    {
      collection: 'accounts',
      where: [
        ['authorId', '==', `${props.userId}`],

      ],
    },
  ])
)(BankListAccount);