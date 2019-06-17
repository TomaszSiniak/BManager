import React, { Component } from 'react';
import { connect } from 'react-redux';
import BankTile from '../BankTile/BankTile';
import AddItemInput from '../../../common/components/AddItemInput/AddItemInput';
import { addBank, removeBank } from '../../../store/actions/accountActions';
import uuid from 'uuid';
import styles from './bankList.scss';
import { get } from 'lodash';

class BankList extends Component {

  state = {
    bankName: null,
  }

  handleBankNameInput = (e) => {
    const bankName =  e.target.value.trim();
    this.setState({
      bankName,
    })
  }

  checkBankExist = (name) => {
    let result = false;
     this.props.bankList.find(item => {
      if (item.bankName.toLowerCase() === name.toLowerCase()) {
        result = true;
      }
    })
    return result
  }

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: uuid(),
      bankName: this.state.bankName,
      accounts: []
    }
    const checkBank = this.checkBankExist(this.state.bankName);

    if(!checkBank) {
      this.props.addBank(data);
      this.buttonDisabled();
    }
  }

  buttonDisabled = () => {
    const bankName = get(this.state,'bankName', null);
    if(!bankName) {
      return true
    }
    return false;
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    const buttonText="Dodaj bank";
    const { bankList } = this.props;
    return (
      <div>
      <div className={styles.SectionName}>Konta Osobiste</div>
        <AddItemInput
          buttonText={buttonText}
          addAction={this.onSubmit}
          handleInput={this.handleBankNameInput}
          buttonDisabled={this.buttonDisabled}
        />
        {bankList.length === 0 ?
          (<div className={styles.EmptyBankListInfo}>Nie masz żadnych banków na swojej liście...</div>)
          :
          (<div className={styles.BankListTitle}>Twoja lista:</div>)
        }
        <div className={styles.BankList}>
          {bankList.map(item => {
            return <BankTile item={item} key={item.id} removeBank={this.props.removeBank} />
          })}
        </div>
      </div>
    );
  }
}
 
const mapStateToProps = state => {
  return {
    bankList: state.accounts.bankList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addBank: (data) => dispatch(addBank(data)),
    removeBank: (id) => dispatch(removeBank(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankList);