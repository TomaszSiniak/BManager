import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../../components/Pages/Dashboard/Dashboard';
import CreditCards from '../../components/Pages/CreditCards/CreditCardsList/CreditCardsList';
import BankListAccount from '../../components/Pages/Accounts/BankListAccount/BankListAccount';
import AccountDetails from '../../components/Pages/Accounts/AccountDetails/AccountDetails';
import Sidepane from '../../layout/Sidepane/Sidepane';
import BackButton from '../../common/components/BackButton/BackButton';
import Login from '../../components/Pages/Login/Login';
import Register from '../../components/Pages/Register/Register';
import DepositsList from '../../components/Pages/Desposits/DepositsList/DespositList';
import styles from './mainContent.scss';
import transitionStyles from '../../styles/transition.scss';
import LogoIcon from '../../assets/images/logo.png';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router';

const MainContent = props => {
  const renderBackButton = () => {
    const pathLocation = props.location.pathname;
    if (pathLocation !== '/' && pathLocation !== '/login' && pathLocation !== '/register') {
      return (
        <Fragment>
          <BackButton />
          <figure className={styles.LogoContentWrapper}>
            <img src={LogoIcon} alt="" />
          </figure>
        </Fragment>

      )
    }
  }
  return (
    <div className={styles.MainContentWrapper}>
      {props.menuVisible && <Sidepane toggleMenu={props.toggleMenu} />}
      <div className={styles.MainContent}>
        {renderBackButton()}
        <TransitionGroup className={transitionStyles.TransitionGroup}>
          <CSSTransition
            key={props.location.key}
            timeout={500}
            classNames={{
              enter: transitionStyles.sectionEnter,
              enterActive: transitionStyles.sectionEnterActive,
              exit: transitionStyles.sectionExit,
              exitActive: transitionStyles.sectionExitActive,
            }}
            mountOnEnter
            unmountOnExit
          >
            <Switch>
              <Route path="/" component={Dashboard} exact />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/accounts" component={BankListAccount} exact match={props.match} />
              <Route path="/accounts/:accountId" component={AccountDetails} />
              <Route path="/deposits" component={DepositsList} />
              <Route path="/cards" component={CreditCards} match={props.match} />

            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  )
}

export default withRouter(MainContent);