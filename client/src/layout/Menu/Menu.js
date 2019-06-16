import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import accountIcon from '../../assets/images/account.svg';
import cardIcon from '../../assets/images/card.svg';
import moneyIcon from '../../assets/images/money.svg';
import homeIcon from '../../assets/images/home.svg';
import styles from './menu.scss';

const Menu = (props) => {
  return (
    <Fragment>
      <Link
        className={styles.MenuLink}
        to="/"
        onClick={props.toggleMenu}
      >
        <figure>
          <img src={homeIcon} alt="" />
        </figure>
        <p>Strona Główna</p>
      </Link>
      <Link
        className={styles.MenuLink}
        to="/accounts"
        onClick={props.toggleMenu}
      >
        <figure>
          <img src={accountIcon} alt="" />
        </figure>
        <p>Konta Osobiste</p>
      </Link>
      <Link
        className={styles.MenuLink}
        to="/cards"
        onClick={props.toggleMenu}
      >
        <figure>
          <img src={cardIcon} alt="" />
        </figure>
        <p>Karty Kredytowe</p>
      </Link>
      <Link
        className={styles.MenuLink}
        to="/patronite"
        onClick={props.toggleMenu}
      >
        <figure>
          <img src={moneyIcon} alt="" />
        </figure>
        <p>Patronite</p>
      </Link>

    </Fragment>
  )
}

export default Menu;