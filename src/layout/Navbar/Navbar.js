import React from 'react';
import styles from './Navbar.scss';
import menuIcon from '../../assets/images/menu.svg';
import LoggedInLinks from '../NavLinks/LoggedInLinks';
import LoggedOutLinks from '../NavLinks/LoggedOutLinks';
import { connect } from 'react-redux';

const Navbar = (props) => {

  const showMenu = () => {
    props.toggleMenu();
  }
  const { auth } = props;
  const windowWidth = window.innerWidth;
  return (
    <div className={styles.HeaderWrapper}>
      {(auth.uid && windowWidth < 768 ) && 
        <figure className={styles.IconContainer} onClick={showMenu}>
          <img src={menuIcon} />
        </figure>
      }
      <div className={styles.LinksWrapper}>
        {auth.uid ? <LoggedInLinks /> : <LoggedOutLinks /> }
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Navbar);