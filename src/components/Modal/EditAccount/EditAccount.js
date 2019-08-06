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
    const totalPrize = get(this.state, 'totalPrize', item.totalPrize ? item.totalPrize : null);

    const data = {
      ...item,
      accountName,
      status,
      totalPrize,
    }
    this.props.updateBankAccount(this.props.match.params.accountId, data);
    this.props.closeModal();
  }
  render () {
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
          <select
            className={styles.EditAccountInput}
            type="number"
            name="totalPrize"
            onChange={this.handleInputChange}
            placeholder="Total award value"
            defaultValue={item.totalPrize}
          >
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
            <option value="200">200</option>
            <option value="250">250</option>
            <option value="300">300</option>
            <option value="350">350</option>
            <option value="300">400</option>

          </select>
          <div className={styles.ButtonWrapper}>
            <button className={styles.EditBtn}>Save</button>
            <button className={styles.EditBtnDefault} onClick={closeModal}>Cancel</button>
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
