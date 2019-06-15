import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import styles from './menu.scss';

const Menu = () => {
  return (
    <div>
      <Link
        to="/accounts"
      >
        Konta Osobiste
      </Link>
      <Link
        to="/cards"
      >
        Karty Kredytowe
      </Link>
    </div>
  )
}

export default Menu;