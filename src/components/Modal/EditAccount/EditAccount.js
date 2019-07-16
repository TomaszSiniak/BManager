import React, { Component } from 'react';
import closeIcon from '../../../assets/images/close.svg';
import { connect } from 'react-redux';
import styles from './editAccount.scss';

class EditAccount extends Component {


  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      bankName: this.state.bankName,
    }
    this.props.closeModal();
  }
  render () {
    const { closeModal, item } = this.props;
    return (
      <div className={styles.AddAccountModalContainer}>
        <form className={styles.AddBankAccountForm} onSubmit={this.onSubmit}>
          <div className={styles.EditTitle}>Edycja:</div>
          <input
            className={styles.EditAccountInput}
            defaultValue={item.accountName}
            onChange={this.handleInputChange}
            name="accountName"
          />
          <select
            className={styles.EditAccountSelect}
            name="status"
            defaultValue={item.status}
            onChange={this.handleInputChange}
            placeholder="Nazwa konta"
          >
            <option value="active">Aktywne</option>
            <option value="closed">Zamknięte</option>
          </select>
            <input
              className={styles.EditAccountInput}
              type="number"
              name="totalPrize"
              onChange={this.handleInputChange}
              placeholder="Wartośc nagrody za konto (zł)"
            />
          <div className={styles.ButtonWrapper}>
            <button className={styles.EditBtn}>Zapisz</button>
            <button className={styles.EditBtnDefault} onClick={closeModal}>Anuluj</button>
          </div>
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

export default connect(null, mapDispatchToProps)(EditAccount);
