import React, { Component } from 'react';
import AddItemSidepane from '../../../../common/components/AddItemSidepane/AddItemSidepane';
import Table from '../../../../common/components/Table/Table';
import CircleAddButton from '../../../../common/components/CircleAddButton/CircleAddButton';
import { addCreditCard, removeCreditCard, toggleSidepane } from '../../../../store/actions/creditCardsActions';
import { togglePromptModal } from '../../../../store/actions/appActions';
import Portal from '../../../Portal/Modal';
import PromptModal from '../../../Modal/Prompt/Prompt';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from './creditCardsList.scss';
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

    const checkAccount = this.checkCreditCardExist(this.state.name);
    if (!checkAccount) {
      this.props.addCreditCard(data);
      this.props.toggleSidepane();
    }
  }

  checkCreditCardExist = name => {
    let result = false;
    const creditCards = get(this.props, 'creditCardsList', [])
    creditCards.find(item => {
      if (item.name.toLowerCase() === name.toLowerCase()) result = true
    })
    return result;
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
    const title = "Dodawanie karty"
    const buttonText = "Dodaj kartę";
    const placeholderBankName = "Nazwę banku...";
    const placeholderName = "Nazwę karty...";
    const { creditCardsList, auth, isSidepaneVisible, toggleSidepane } = this.props;
    const { startDate } = this.state;

    if (!auth.uid) return <Redirect to='/login' />
    return (
      <div className={styles.ContentWrapper}>
        <div className={styles.SectionName}>Karty kredytowe</div>
        {creditCardsList.length > 0 ? (
          <Table
            items={creditCardsList}
            source={this.props.match.path}
            togglePromptModal={this.props.togglePromptModal}
            setIdToRemove={this.setIdToRemove}
          />) : 
          ((<div className={styles.EmptyCreditCardsListInfo}>Nie posiadasz kart kredytowych...</div>))
        }

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
              remove={this.props.removeCreditCard}
              togglePromptModal={this.props.togglePromptModal}
            />
          </Portal>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const creditCards = get(state.firestore.ordered, 'creditCards', []);
  return {
    creditCardsList: creditCards,
    auth: state.firebase.auth,
    userId: state.firebase.auth.uid,
    isPromptModalVisible: state.app.isPromptModalVisible,
    isSidepaneVisible: state.creditCards.isSidepaneVisible,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCreditCard: data => dispatch(addCreditCard(data)),
    removeCreditCard: id => dispatch(removeCreditCard(id)),
    togglePromptModal: () => dispatch(togglePromptModal()),
    toggleSidepane: () => dispatch(toggleSidepane())
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [
    {
      collection: 'creditCards',
      where: [
        ['authorId', '==', `${props.userId}`],

      ],
    },
  ])
)(BankListAccount);