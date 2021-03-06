import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import accountIcon from '../../assets/images/account.svg';
import cardIcon from '../../assets/images/card.svg';
import moneyIcon from '../../assets/images/money.svg';
import homeIcon from '../../assets/images/home.svg';
import sackIcon from '../../assets/images/sack-dollar.svg';
import chartIcon from '../../assets/images/chart.svg';
import styles from './menu.scss';

const Menu = (props) => {

  const width = window.innerWidth;
  const handleShowMenu = () => {
    if (width < 1024) {
      props.toggleMenu();
    }
  }
  return (
    <div className={styles.MenuWrapper}>
      <Link
        className={styles.MenuLink}
        to="/"
        onClick={handleShowMenu}
      >
        <figure>
          <img src={homeIcon} alt="" />
        </figure>
        <p>Start!</p>
      </Link>
      <Link
        className={styles.MenuLink}
        to="/accounts"
        onClick={handleShowMenu}
      >
        <figure>
          <img src={accountIcon} alt="" />
        </figure>
        <p>Konta bankowe</p>
      </Link>
      <Link
        className={styles.MenuLink}
        to="/cards"
        onClick={handleShowMenu}
      >
        <figure>
          <img src={cardIcon} alt="" />
        </figure>
        <p>Karty kredytowe</p>
      </Link>
      <Link
        className={styles.MenuLink}
        to="/deposits"
        onClick={handleShowMenu}
      >
        <figure>
          <img src={sackIcon} alt="" />
        </figure>
        <p>Lokaty</p>
      </Link>
      <Link
        className={styles.MenuLink}
        to="/"
        onClick={handleShowMenu}
      >
        <figure>
          <img src={chartIcon} alt="" />
        </figure>
        <p>Analizy</p>
      </Link>
      <Link
        className={styles.MenuLink}
        to="/patronite"
        onClick={handleShowMenu}
      >
        <figure>
          <img src={moneyIcon} alt="" />
        </figure>
        <p>Patronite</p>
      </Link>

    </div>
  )
}

export default Menu;