import React, { Component } from 'react';
import DepositTile from '../DepositTile/DepositTile';
import { addDeposit } from '../../../../store/actions/depositActions';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import  { get } from 'lodash';
import styles from './despositsList.scss';

class DespositList extends Component {

  state = {
    status: 'active',
  }

  onSubmit = e => {
    e.preventDefault();
    const { status, bankName, depositName, percentage, period } = this.state;
    if (!status || !bankName || !depositName || !percentage || !period) return;
    this.props.addNewDeposit(this.state)
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

  render () {
    return (
      <div className={styles.BankDepositsWrapper}>
        <div className={styles.DespositTitle}>Bank Deposits</div>
        <form className={styles.DespositForm} onSubmit={this.onSubmit}>
          <input className={styles.DepositFormInput} placeholder="Enter bank name..." onChange={this.handleDepositData} name="bankName" />
          <input className={styles.DepositFormInput} placeholder="Enter deposit name..." onChange={this.handleDepositData} name="depositName" />
          <div className={styles.SelectWrapper}>
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
          </div>
          <button className={styles.DepositBtn}>Add Deposit</button>
        </form>
        <div className={styles.DepositsListTitle}>Your deposits list:</div>
        {this.props.deposits.map(item => {
          return <DepositTile item={item} key={item.id} />
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const deposits = get(state.firestore.ordered, 'deposits', []);
  return {
    id: state.firebase.auth.uid,
    deposits,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewDeposit: data => dispatch(addDeposit(data)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [
    {'collection': 'deposits',
      where: [
        ['authorId', '==', `${props.id}`],
      ],
    }
  ])
)(DespositList);

