import React, { Component, Fragment } from 'react';
import { updateBankAccount } from '../../../store/actions/accountActions';
import { connect } from 'react-redux';
import { get } from 'lodash';
import styles from './editAccount.scss';

class EditAccount extends Component {

  state = {
    status: 'active',
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    })
  }

  onSubmit = e => {
    e.preventDefault();
    const { item } = this.props;
    const name = get(this.state, 'name', item.name);
    const status = get(this.state, 'status', item.status);

    const data = {
      ...item,
      name,
      status,
    }
    this.props.updateBankAccount(this.props.match.params.accountId, data);
    this.props.closeModal();
  }
  render () {
    const { closeModal, item } = this.props;
    return (
      <div className={styles.AddAccountModalContainer}>
        <form className={styles.AddBankAccountForm} onSubmit={this.onSubmit}>
          <div className={styles.EditTitle}>Edycja konta:</div>
          <label className={styles.InputLabel}>Nazwa konta</label>
          <input
            className={styles.EditAccountInput}
            defaultValue={item.name}
            onChange={this.handleInputChange}
            placeholder="Enter account name..."
            name="name"
            maxLength="12"
          />
          <label className={styles.InputLabel}>Status</label>
          <select
            className={styles.EditAccountSelect}
            name="status"
            defaultValue={item.status}
            onChange={this.handleInputChange}
            placeholder="status"
          >
            <option value="active">Aktywne</option>
            <option value="inactive">Nieaktywne</option>
          </select>
          {this.state.status === 'inactive' && (
            <Fragment>
            <label className={styles.InputLabel}>Data zamknięcia</label>
            <input
              className={styles.EditAccountInput}
              onChange={this.handleInputChange}
              placeholder="Account closed date"
            />
            </Fragment>
          )}
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
