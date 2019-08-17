import React, { Component } from 'react';
import LogoIcon from '../../../../assets/images/logo.png';
import { connect } from 'react-redux';
import styles from './depositForm.scss';

class DespositForm extends Component {

  state = {
    status: 'active',
  }

  onSubmit = e => {
    e.preventDefault();
    const { status, bankName, depositName, percentage, period } = this.state;
    if (!status || !bankName || !depositName || !percentage || !period) return;
    this.props.addNewDeposit(this.state);
    this.props.toggleSidepane();
  }

  handleDepositData = e => {
    e.preventDefault();
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  }

  closeSidepane = e => {
    const target = e.target.classList.value;
    if (target === 'DepositFormWrapper--InrL4') {
      this.props.toggleSidepane();
    }

  }

  render () {
    return (
      <div className={styles.DepositFormWrapper} onClick={this.closeSidepane}>
        <form className={styles.DepositForm} onSubmit={this.onSubmit}>
          <figure className={styles.LogoDepositWrapper}>
            <img src={LogoIcon} alt="" />
          </figure>
          <div className={styles.AddDepositTitle}>Add Deposit:</div>
          <input className={styles.DepositFormInput} placeholder="Enter bank name..." onChange={this.handleDepositData} name="bankName" />
          <input className={styles.DepositFormInput} placeholder="Enter deposit name..." onChange={this.handleDepositData} name="depositName" />
          <input className={styles.DepositFormInput} type="number" placeholder="Amount..." onChange={this.handleDepositData} name="amount" />
          <select
            className={styles.DepositFormSelect}
            onChange={this.handleDepositData}
            name="period"
            defaultValue="Deposit period..."
          >
            <option disabled>Deposit period...</option>
            <option value="1 month">1 month</option>
            <option value="2 months">2 months</option>
            <option value="3 months">3 months</option>
            <option value="4 months">4 months</option>
            <option value="5 months">5 months</option>
            <option value="6 months">6 months</option>
          </select>
          <select
            className={styles.DepositFormSelect}
            onChange={this.handleDepositData}
            name="percentage"
            defaultValue="Deposit % ..."
          >
            <option disabled>Deposit % ...</option>
            <option value="1%">1 %</option>
            <option value="2%">2 %</option>
            <option value="2.1%">2.1 %</option>
            <option value="2.2%">2.2 %</option>
            <option value="2.3%">2.3 %</option>
            <option value="2.4%">2.4 %</option>
            <option value="2.5%">2.5 %</option>
            <option value="2.6%">2.6 %</option>
            <option value="2.7%">2.7 %</option>
            <option value="2.8%">2.8 %</option>
            <option value="2.9%">2.9 %</option>
            <option value="3.0%">3.0 %</option>
          </select>
          <button className={styles.AddNewDepositBtn}>Add</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // addNewDeposit: data => dispatch(addDeposit(data)),
  }
}

export default connect(null, mapDispatchToProps)(DespositForm);

