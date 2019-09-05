import React, { Component, Fragment } from 'react';
import LogoIcon from '../../../../assets/images/logo.png';
import DatePicker from '../../../../common/components/DatePicker/DatePicker';
import styles from './depositSidepane.scss';

class DespositSidepane extends Component {

  state = {
    status: 'active',
    startDate: null,
  }

  onSubmit = e => {
    e.preventDefault();
    const { status, bankName, percentage, startDate } = this.state;
    if (!status || !bankName || !percentage || !startDate) return;
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
    if (target === 'DepositFormWrapper--3zjxC') {
      this.props.toggleSidepane();
    }
  }
  
  handlePickerDate = date => {
    const parsedDate = Date.parse(date);
    this.setState({
      startDate: parsedDate
    });
  }

  render () {
   const { startDate } = this.state;
   console.log(this.state)
    return (
      <div className={styles.DepositFormWrapper} onClick={this.closeSidepane}>
        <form className={styles.DepositForm} onSubmit={this.onSubmit}>
          <div className={styles.DepositInputsWrapper}>
            <figure className={styles.LogoDepositWrapper}>
              <img src={LogoIcon} alt="" />
            </figure>
            <div className={styles.AddDepositTitle}>Dodaj lokatę:</div>
            <input className={styles.DepositFormInput} placeholder="Wpisz nazwę banku..." onChange={this.handleDepositData} name="bankName" maxLength="9" />
            <input className={styles.DepositFormInput} type="number" placeholder="Kwota..." onChange={this.handleDepositData} name="amount" />
            <div className={styles.DepositFormDateWrapper}>
              <div className={styles.DepositFormDateTitle}>Data otwarcia:</div>
              <DatePicker startDate={startDate} handlePickerDate={this.handlePickerDate} />
            </div>
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
          </div>
          <div>
            <button className={styles.AddNewDepositBtn}>Dodaj</button>
          </div>
        </form>
      </div>
    )
  }
}

export default DespositSidepane;

