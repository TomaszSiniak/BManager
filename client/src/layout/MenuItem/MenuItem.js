import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = (props) => {
  return (
    <li>
      <Link to={`/bankAccount/${props.bank.id}`} >
        {props.bank.bankName}
      </Link>
    </li>
  )
}

export default MenuItem;