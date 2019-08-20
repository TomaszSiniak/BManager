import React from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import styles from './datepicker.scss';
import "!style-loader!css-loader!react-datepicker/dist/react-datepicker.css";

const PickerDate = props => {
  const handleDate = date => {
    props.handlePickerDate(date)
  }
  return (
    <DatePicker
      selected={props.startDate}
      onChange={handleDate}
      dateFormat="dd-MM-yyyy"
      minDate={moment().toDate()}
      className={styles.DatepickerInput}
    />
  )
}

export default PickerDate;