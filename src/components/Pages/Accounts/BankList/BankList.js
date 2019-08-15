import React, { Component } from 'react';
import { connect } from 'react-redux';
import BankTile from '../BankTile/BankTile';
import AddItemInput from '../../../../common/components/AddItemInput/AddItemInput';
import { addBank, removeBank } from '../../../../store/actions/bankActions';
import { togglePromptModal } from '../../../../store/actions/appActions';
import PromptModal from '../../../Modal/Prompt/Prompt';
import Portal from '../../../Portal/Modal';
import styles from './bankList.scss';
import '../../../../styles/main.scss';
import { get } from 'lodash';
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Loader from '../../../../common/components/Loader/Loader';


class BankList extends Component {

  state = {
    bankName: null,
    removeId: null,
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
    }
    const checkBank = this.checkBankExist(this.state.bankName);
    if (!checkBank) {
      this.props.addBank(data);
      this.buttonDisabled();
    }
  }

  buttonDisabled = () => {
    const bankName = get(this.state, 'bankName', null);
    if (!bankName) {
      return true
    }
    return false;
  }

  handleChange (date) {
    this.setState({
      startDate: date
    });
  }
  handleTogglePromptModal = id => {
    this.setState({
      removeId: id,
    })
    this.props.togglePromptModal();
  }

  render () {
    const buttonText = "Add bank";
    const placeholderText ="Enter bank name..."
    const { bankList, auth, removeBank, togglePromptModal} = this.props;

    if (!auth.uid) return <Redirect to='/login' />
    return (
      <div className={styles.ContentWrapper} >
        <div className={styles.SectionName}>Bank Accounts</div>
        <AddItemInput
          buttonText={buttonText}
          addAction={this.onSubmit}
          handleInput={this.handleBankNameInput}
          buttonDisabled={this.buttonDisabled}
          placeholder={placeholderText}
        />
      
        {bankList.length === 0 ?
          (<div className={styles.EmptyBankListInfo}>You have no banks on your list...</div>)
          :
          (<div className={styles.BankListTitle}>Your banks list:</div>)
        }
        
        <div className={styles.BankList}>
          {bankList.map(item => {
            return <BankTile
              item={item}
              key={item.id}
              togglePromptModal= {this.handleTogglePromptModal}
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
    { collection: 'banks', where: [
      'authorId', '==', `${props.userId}`
    ]}
  ]),
)(BankList);