import React, { Component } from 'react';
import BankTile from '../BankTile/BankTile';
import AddItemInput from '../../../../common/components/AddItemInput/AddItemInput';
import { addBank, removeBank } from '../../../../store/actions/bankActions';
import { togglePromptModal } from '../../../../store/actions/appActions';
import PromptModal from '../../../Modal/Prompt/Prompt';
import Portal from '../../../Portal/Modal';
import DatePicker from '../../../../common/components/DatePicker/DatePicker';
import { get } from 'lodash';
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Loader from '../../../../common/components/Loader/Loader';
import styles from './bankList.scss';
import '../../../../styles/main.scss';

class BankList extends Component {

  state = {
    bankName: null,
    removeId: null,
    startDate: null,
  }


  handleBankNameInput = (e) => {
    const bankName = e.target.value.trim();
    this.setState({
      bankName,
    })
  }

  checkBankExist = (name) => {
    let result = false;
    this.props.bankList.find(item => {
      if (item.bankName.toLowerCase() === name.toLowerCase()) {
        result = true;
      }
    })
    return result;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      bankName: this.state.bankName,
      startDate: this.state.startDate,
    }
    const checkBank = this.checkBankExist(this.state.bankName);
    if (!checkBank) {
      this.props.addBank(data);
      this.buttonDisabled();
    }
  }

  buttonDisabled = () => {
    const bankName = get(this.state, 'bankName', null);
    const startDate = get(this.state, 'startDate', null);
    if (!bankName || !startDate) {
      return true
    }
    return false;
  }

  handleTogglePromptModal = id => {
    this.setState({
      removeId: id,
    })
    this.props.togglePromptModal();
  }

  handlePickerDate= date => {
    const parsedDate = Date.parse(date);

    this.setState({
      startDate: parsedDate
    });
  }

  render () {
    const buttonText = "Dodaj bank";
    const placeholderText = "Wpisz nazwę banku..."
    const { bankList, auth, removeBank, togglePromptModal } = this.props;
    const {startDate} = this.state;

    if (!auth.uid) return <Redirect to='/login' />
    return (
      <div className={styles.ContentWrapper} >
        <div className={styles.SectionName}>Lista Banków</div>
        <AddItemInput
          buttonText={buttonText}
          addAction={this.onSubmit}
          handleInput={this.handleBankNameInput}
          buttonDisabled={this.buttonDisabled}
          placeholder={placeholderText}
          startDate={startDate}
          handlePickerDate={this.handlePickerDate}
        />
        {bankList.length === 0 ?
          (<div className={styles.EmptyBankListInfo}>Brak banków na liście..</div>)
          :
          (<div className={styles.BankListTitle}>Twoja lista banków:</div>)
        }

        <div className={styles.BankList}>
          {bankList.map(item => {
            return <BankTile
              item={item}
              key={item.id}
              togglePromptModal={this.handleTogglePromptModal}
            />
          })}
          {this.props.isPromptModalVisible && (
            <Portal>
              <PromptModal
                removeId={this.state.removeId}
                remove={removeBank}
                togglePromptModal={togglePromptModal}
              />
            </Portal>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const bankList = get(state.firestore.ordered, 'banks', []);
  return {
    bankList,
    auth: state.firebase.auth,
    userId: state.firebase.auth.uid,
    isPromptModalVisible: state.app.isPromptModalVisible,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addBank: data => dispatch(addBank(data)),
    removeBank: id => dispatch(removeBank(id)),
    togglePromptModal: () => dispatch(togglePromptModal())
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [
    {
      collection: 'banks', where: [
        'authorId', '==', `${props.userId}`
      ]
    }
  ]),
)(BankList);