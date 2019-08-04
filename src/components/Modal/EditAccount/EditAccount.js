import React, { Component } from 'react';
import { updateBankAccount } from '../../../store/actions/accountActions';
import { connect } from 'react-redux';
import { get } from 'lodash';
import styles from './editAccount.scss';

class EditAccount extends Component {

  state = {
    status: 'active',
  }

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
    const { item } = this.props;
    const accountName = get(this.state, 'accountName', item.accountName);
    const status = get(this.state, 'status', item.status);
    const totalPrize = get(this.state, 'totalPrize', null);

    const data = {
      ...item,
      accountName,
      status,
      totalPrize,
    }

    this.props.updateBankAccount(this.props.match.params.accountId, data);
    this.props.closeModal();
  }
  render() {
    const { closeModal, item } = this.props;
    return (
      <div className={styles.AddAccountModalContainer}>
        <form className={styles.AddBankAccountForm} onSubmit={this.onSubmit}>
          <div className={styles.EditTitle}>Edit:</div>
          <input
            className={styles.EditAccountInput}
            defaultValue={item.accountName}
            onChange={this.handleInputChange}
            placeholder="Account name"
            name="accountName"
          />
          <select
            className={styles.EditAccountSelect}
            name="status"
            defaultValue={item.status}
            onChange={this.handleInputChange}
            placeholder="Account name"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {this.state.status === 'inactive' && (
            <input
             className={styles.EditAccountInput}
             onChange={this.handleInputChange}
             placeholder="Account closed date"
             />
          )}
          <input
            className={styles.EditAccountInput}
            type="number"
            name="totalPrize"
            onChange={this.handleInputChange}
            placeholder="Total award value(e.g 200 zł)"
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
    updateBankAccount: (id, data) => dispatch(updateBankAccount(id, data)),
  }
}

export default connect(null, mapDispatchToProps)(EditAccount);
