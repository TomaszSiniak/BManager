import React, { Component } from 'react';
import { addPromotionCondition } from '../../../store/actions/conditionActions';
import { connect } from 'react-redux';
import { get } from 'lodash';
import styles from './addPromotionCondition.scss';

class AddPromotionCondition extends Component {

  state = {
    status: false,
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
    const conditionName = get(this.state, 'conditionName', null);
    const status = get(this.state, 'status', null);
    const accountId = get(item, 'id', this.props.match.params.accountId);
    const conditionMonth = get(this.state, 'conditionMonth', null);
    const bankId = get(item, 'bankId', null);
    
    const data = {
      conditionName,
      status,
      accountId,
      conditionMonth,
      bankId
    }

    const isPayloadEmpty = this.checkDataPayload();

    if(isPayloadEmpty) return;

    this.props.addNewPromotionCondition(data);
    this.props.closeModal();
  }

  checkDataPayload = () => {
    const conditionMonth = get(this.state, 'conditionMonth', null);
    const conditionName = get(this.state, 'conditionName', null);
    if (!conditionMonth || !conditionName) return true;
    return false;
  }

  render() {
    const { closeModal} = this.props;
    return (
      <div className={styles.AddTermPromotionContainer}>
        <form className={styles.AddTermPromotionsForm} onSubmit={this.onSubmit}>
          <div className={styles.ConditionTitle}>Add promotion's condition:</div>
          <select
            className={styles.ConditionPromotionSelect}
            defaultValue="Choose month..."
            onChange={this.handleInputChange}
            name="conditionMonth"
          >
            <option disabled>Choose month...</option>
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="october">October</option>
            <option value="november">November</option>
            <option value="december">December</option>
          </select>
          <select
            className={styles.ConditionPromotionSelect}
            defaultValue="Choose condition..."
            onChange={this.handleInputChange}
            name="conditionName"
          >
            <option disabled>Choose condition...</option>
            <option value="300 PLN paid by debit card">300 PLN paid by debit card</option>
            <option value="500 PLN paid by debit card">500 PLN paid by debit card</option>
            <option value="1000 PLN paid by debit card">1000 PLN paid by debit card</option>
            <option value="1500 PLN paid by debit card">1500 PLN paid by debit card</option>
            <option disabled />
            <option value="500 PLN transfer into account">500 PLN transfer into account</option>
            <option value="1000 PLN transfer into account">1000 PLN transfer into account</option>
            <option value="1500 PLN transfer into account">1500 PLN transfer into account</option>
            <option value="2000 PLN transfer into account">2000 PLN transfer into account</option>
            <option value="3000 PLN transfer into account">3000 PLN transfer into account</option>
          </select>
          <div className={styles.ButtonWrapper}>
            <button className={styles.ConditionBtn}>Save</button>
            <button className={styles.ConditionBtnDefault} onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewPromotionCondition: data => dispatch(addPromotionCondition(data)),
  }
}

export default connect(null, mapDispatchToProps)(AddPromotionCondition);
