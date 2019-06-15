import React, { Component } from 'react';
import closeIcon from '../../../assets/images/close.svg';
import uuid from 'uuid';
import { addAccount } from '../../../actions/accountActions';
import { connect } from 'react-redux';
import styles from './addBank.scss';

class AddBank extends Component {

  state = {
    bankName: null,
  }
  handleBankNameInput = (e) => {
    const bankName =  e.target.value.trim();
    this.setState({
      bankName,
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: uuid(),
      bankName: this.state.bankName,
    }
    this.props.addAccount(data);
    this.props.closeModal();
  }
  render () {
    return (
      <div className={styles.AddAccountModalContainer}>
        <form className={styles.AddBankAccountForm} onSubmit={this.onSubmit}>
          <figure className={styles.IconContainer} onClick={this.props.closeModal}>
            <img src={closeIcon} />
          </figure>
          <label>Nazwa Banku</label>
          <input  onChange={this.handleBankNameInput}/>
          <button>Zapisz</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAccount: (data) => dispatch(addAccount(data)),
  }
}

export default connect(null, mapDispatchToProps)(AddBank);
