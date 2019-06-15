import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../../components/Pages/Dashboard/Dashboard';
import BankList from '../../components/Pages/BankList/BankList'
import BankListCards from '../../components/Pages/Cards/BankListCards/BankListCards'
import BankListAccount from '../../components/Pages/BankListAccount/BankListAccount'
import Sidepane from '../../layout/Sidepane/Sidepane';
import BackButton from '../../common/components/BackButton/BackButton';
import styles from './mainContent.scss';

const MainContent = (props) => {
  return (
    <div className={styles.MainContent}>
      {props.menuVisible && <Sidepane toggleMenu={props.toggleMenu} />}
      <BackButton/>
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/accounts" component={BankList} exact />
        <Route path="/accounts/:bankName" component={BankListAccount} />
        <Route path="/cards" component={BankListCards} />
      </Switch>
    </div>
  )
}

export default MainContent;