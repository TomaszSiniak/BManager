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
          <figure className={styles.IconContainer} onClick={closeModal}>
            <img src={closeIcon} />
          </figure>
          <label>Nazwa Banku:</label>
          <input
            defaultValue={item.accountName}
            onChange={this.handleInputChange}
            name="accountName"
          />
          <label>Status konta:</label>
          <select
            name="status"
            defaultValue={item.status}
            onChange={this.handleInputChange}
          >
            <option value="active">Aktywne</option>
            <option value="closed">Zamknięte</option>
          </select>
          <label>Nagroda za konto:</label>
            <input
              name="totalPrize"
              onChange={this.handleInputChange}
            />
          <div>
            
          </div>
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

export default connect(null, mapDispatchToProps)(EditAccount);
