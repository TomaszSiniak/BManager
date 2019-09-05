import React, { Component } from 'react';
import { addPromotionCondition } from '../../../store/actions/accountActions';
import DatePicker from '../../../common/components/DatePicker/DatePicker';
import { connect } from 'react-redux';
import { get } from 'lodash';
import styles from './addPromotionCondition.scss';

class AddPromotionCondition extends Component {

  state = {
    status: false,
    conditionEndDate: null,
  }

  handleInputChange = e => {
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
    const bankId = get(item, 'bankId', null);
    const conditionEndDate = get(this.state, 'conditionEndDate', null);
    
    const data = {
      conditionName,
      status,
      accountId,
      bankId,
      conditionEndDate
    }

    const isPayloadEmpty = this.checkDataPayload();

    if(isPayloadEmpty) return;

    this.props.addNewPromotionCondition(data);
    this.props.closeModal();
  }

  checkDataPayload = () => {
    const conditionEndDate = get(this.state, 'conditionEndDate', null);
    const conditionName = get(this.state, 'conditionName', null);
    if (!conditionEndDate || !conditionName) return true;
    return false;
  }

  handlePikcerDate= date => {
    const parsedDate = Date.parse(date);

    this.setState({
      conditionEndDate: parsedDate
    });
  }

  render() {
    const { closeModal } = this.props;
    const { conditionEndDate } = this.state;
    return (
      <div className={styles.AddTermPromotionContainer}>
        <form className={styles.AddTermPromotionsForm} onSubmit={this.onSubmit}>
          <div className={styles.ConditionTitle}>Dodaj warunek promocji:</div>
          <div className={styles.ConditionTip}>Konto otwarte w promocji? Dodaj warunek i termin niezbędne do otrzymania bonusu</div>
          <label className={styles.LabelInfo}>Warunek promocji</label>
          <select
            className={styles.ConditionPromotionSelect}
            defaultValue="Choose condition..."
            onChange={this.handleInputChange}
            name="conditionName"
          >
            <option disabled>Wybierz warunek...</option>
            <option value="płatność 300 PLN">płatność 300 PLN kartą</option>
            <option value="płatność 500 PLN">płatność 500 PLN kartą</option>
            <option value="płatność 1000 PLN">płatność 1000 PLN kartą</option>
            <option disabled />
            <option value="wpływ 500 PLN">wpływ 500 PLN na konto</option>
            <option value="wpływ 1000 PLN">wpływ 1000 PLN na konto</option>
            <option value="wpływ 1500 PLN">wpływ 1500 PLN na konto</option>
            <option disabled />
            <option value="1 transakcja kartą">wykonanie 1 transakcji kartą</option>
            <option value="3 transakcje kartą">wykonanie 3 transakcji kartą</option>
            <option value="5 transakcje kartą">wykonanie 5 transakcji kartą</option>

          </select>
          <div className={styles.DatePickerWrapper}>
          <label className={styles.LabelInfo}>Termin:</label>
            <DatePicker startDate={conditionEndDate} handlePickerDate={this.handlePikcerDate}/>
          </div>
          <div className={styles.ButtonWrapper}>
            <button className={styles.ConditionBtn}>Zapisz</button>
            <button className={styles.ConditionBtnDefault} onClick={closeModal}>Anuluj</button>
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
