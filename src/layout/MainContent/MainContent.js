import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../../components/Pages/Dashboard/Dashboard';
import BankList from '../../components/Pages/BankList/BankList'
import BankListCards from '../../components/Pages/Cards/BankListCards/BankListCards'
import BankListAccount from '../../components/Pages/BankListAccount/BankListAccount'
import AccountDetails from '../../components/Pages/Accounts/AccountDetails/AccountDetails'
import Sidepane from '../../layout/Sidepane/Sidepane';
import BackButton from '../../common/components/BackButton/BackButton';
import Login from '../../components/Pages/Login/Login';
import Register from '../../components/Pages/Register/Register';
import styles from './mainContent.scss';
import { withRouter } from 'react-router';

const MainContent = (props) => {

  const renderBackButton = () => {
    const pathLocation = props.location.pathname;
    if(pathLocation !== '/' && pathLocation !== '/login' && pathLocation !== '/register') {
      return <BackButton />
    }
  }
  return (
    <div className={styles.MainContent}>
      {props.menuVisible && <Sidepane toggleMenu={props.toggleMenu} />}
      {renderBackButton()}
      <Switch>
        <Route path="/" component={Dashboard} exact/>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/accounts" component={BankList} exact />
        <Route path="/accounts/:bankName" component={BankListAccount} exact />
        <Route path="/accounts/:bankName/:accountId" component={AccountDetails} />
        <Route path="/cards" component={BankListCards} />
      </Switch>
    </div>
  )
}

export default withRouter(MainContent);