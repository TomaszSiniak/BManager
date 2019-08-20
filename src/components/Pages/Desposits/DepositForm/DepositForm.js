import React, { Component, Fragment } from 'react';
import LogoIcon from '../../../../assets/images/logo.png';
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

    const { amount, percentage, period } = this.state;
 
    this.calcDepoEndDate(period)


    if (!amount || !percentage || !period) return;
    this.calcDeposit(amount, percentage, period);
  }

  closeSidepane = e => {
    const target = e.target.classList.value;
    if (target === 'DepositFormWrapper--InrL4') {
      this.props.toggleSidepane();
    }
  }

  //zbugowane
  calcDeposit = (amount, percentage, period) => {
    const days = period * 30;
    const percent = (percentage / 100)
    let interest = (amount * percent * days) / 365;
    interest = interest.toFixed(2);

    // tax
    let tax = interest * 0.19;
    tax = tax.toFixed(2);

    // profit
    let profit = interest - tax;
    profit = profit.toFixed(2);

    this.setState({
      interest,
      tax,
      profit
    })
  }

  //zbugowane
  calcDepoEndDate = period => {
    if(!period) return;

    const days = period * 30;
    const date = new Date();
    const parsedDate = Date.parse(date)
    const endDateInMilisec = parsedDate + 1000 * 60 * 60 * 24 * days;

    const endDate = new Date(endDateInMilisec).toLocaleDateString();

    this.setState({
      endDate
    });
  }

  render () {
    return (
      <div className={styles.DepositFormWrapper} onClick={this.closeSidepane}>
        <form className={styles.DepositForm} onSubmit={this.onSubmit}>
          <div className={styles.DepositInputsWrapper}>
            <figure className={styles.LogoDepositWrapper}>
              <img src={LogoIcon} alt="" />
            </figure>
            <div className={styles.AddDepositTitle}>Dodaj lokatę:</div>
            <input className={styles.DepositFormInput} placeholder="Wpisz nazwę banku..." onChange={this.handleDepositData} name="bankName" />
            <input className={styles.DepositFormInput} placeholder="Wpisz nawę lokaty..." onChange={this.handleDepositData} name="depositName" />
            <input className={styles.DepositFormInput} type="number" placeholder="Kwota..." onChange={this.handleDepositData} name="amount" />
            <select
              className={styles.DepositFormSelect}
              onChange={this.handleDepositData}
              name="period"
              defaultValue="Czas trwania lokaty..."
            >
              <option disabled>Czas trwania lokaty...</option>
              <option value="1">1 miesiąc</option>
              <option value="2">2 miesiące</option>
              <option value="3">3 miesiące</option>
              <option value="4">4 miesiące</option>
              <option value="5">5 miesięcy</option>
              <option value="6">6 miesięcy</option>
            </select>
            <select
              className={styles.DepositFormSelect}
              onChange={this.handleDepositData}
              name="percentage"
              defaultValue="Oprocentowanie..."
            >
              <option disabled>Oprocentowanie...</option>
              <option value="1">1 %</option>
              <option value="2">2 %</option>
              <option value="2.1">2.1 %</option>
              <option value="2.2">2.2 %</option>
              <option value="2.3">2.3 %</option>
              <option value="2.4">2.4 %</option>
              <option value="2.5">2.5 %</option>
              <option value="2.6">2.6 %</option>
              <option value="2.7">2.7 %</option>
              <option value="2.8">2.8 %</option>
              <option value="2.9">2.9 %</option>
              <option value="3.0">3.0 %</option>
            </select>
            <div>
              <div>Przychód: {this.state.interest} </div>
              <div>Podatek(19%): {this.state.tax}</div>
              <div>Zysk: {this.state.profit}</div>
            </div>
          </div>
          <div>
            <button className={styles.AddNewDepositBtn}>Dodaj</button>
          </div>
        </form>
      </div>
    )
  }
}

export default DespositForm;

