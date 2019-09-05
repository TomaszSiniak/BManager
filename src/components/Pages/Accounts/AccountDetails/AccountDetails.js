import React, { Component, Fragment } from 'react';
import EditAccountModal from '../../../Modal/EditAccount/EditAccount';
import AddPromotionConditionModal from '../../../Modal/AddPromotionCondition/AddPromotionCondition';
import { togglePromptModal } from '../../../../store/actions/appActions';
import PromptModal from '../../../Modal/Prompt/Prompt';
import Portal from '../../../Portal/Modal';
import ConditionTile from '../ConditionTile/ConditionTile';
import Table from '../Table/Table';
import { removePromotionCondition, updateConditionStatus } from '../../../../store/actions/accountActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { get } from 'lodash';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import stylesMain from '../../../../styles/main.scss';
import styles from './accountDetails.scss';

class AccountDetails extends Component {
  state = {
    isEditModlaOpen: false,
    isTermPromotionsModalOpen: false,
    incomeTableActive: true,
  }

  handleEditModal = () => {
    this.setState({
      isEditModalOpen: !this.state.isEditModalOpen
    })
  }

  handleTermPromotionsModal = () => {
    this.setState({
      isTermPromotionsModalOpen: !this.state.isTermPromotionsModalOpen,
    })
  }

  setIdToRemove = id => {
    this.setState({
      removeId: id,
    })
  }

  showIncomeTable = () => {
    this.setState({
      incomeTableActive: true
    })
  }

  showConditionTable = () => {
    this.setState({
      incomeTableActive: false
    })
  }

  render () {
    const { account: { name, status, startDate }, auth, conditions, removeCondition, updateConditionStatus, togglePromptModal } = this.props;
    const parsedStartDate = new Date(startDate).toLocaleDateString();
    const { incomeTableActive } = this.state;
    if (!auth.uid) return <Redirect to="/login" />
    return (
      <div className={styles.ContentWrapper}>
        <div>
          <div className={styles.DetailsRow}>Nazwa: {name}</div>
          <div className={styles.StatusWrapper}>
            <div>Status: {status}</div>
            {status === 'active' ? (<span className={stylesMain.DotActive} />) : (<span className={stylesMain.DotInactive} />)}
          </div>
          <div className={styles.DetailsRow}>Data otwarcia: {parsedStartDate}</div>
          <div className={styles.DetailsRow}>Zysk z konta: {0} pln</div>
          <div className={styles.ButtonWrapper}>
            <button onClick={this.handleEditModal} className={styles.EditBtn}>Edycja</button>
            <button className={styles.EditBtn} onClick={this.handleTermPromotionsModal}>Dodaj warunek promocji konta</button>
            <button className={styles.AddPromotionBtn}>Dodaj zysk</button>
          </div>
        </div>
        <div className={styles.AccountsTableDetails}>
          <div className={styles.AccountDetailsTabWrapper}>
            <button onClick={this.showIncomeTable} className={incomeTableActive ? styles.AccountDetailsTabActive : styles.AccountDetailsTab}>Tabela zysków</button>
            <button onClick={this.showConditionTable} className={!incomeTableActive ? styles.AccountDetailsTabActive : styles.AccountDetailsTab}>Tabela warunków</button>
          </div>
          {incomeTableActive ?
            (<div>Tabela zysków ble ble tutaj bedzie druga tabela z wprowadzonymi zyskami z konta

            </div>
            ) : (
              <Table
                items={conditions}
                setIdToRemove={this.setIdToRemove}
                updateConditionStatus={updateConditionStatus}
                togglePromptModal={togglePromptModal}
              />
            )}
        </div>

        {this.state.isEditModalOpen && (
          <Portal>
            <EditAccountModal item={this.props.account} closeModal={this.handleEditModal} match={this.props.match} />
          </Portal>
        )}
        {this.state.isTermPromotionsModalOpen && (
          <Portal>
            <AddPromotionConditionModal item={this.props.account} closeModal={this.handleTermPromotionsModal} match={this.props.match} />
          </Portal>
        )}
        {this.props.isPromptModalVisible && (
          <Portal>
            <PromptModal
              removeId={this.state.removeId}
              remove={this.props.removeCondition}
              togglePromptModal={this.props.togglePromptModal}
            />
          </Portal>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeCondition: id => dispatch(removePromotionCondition(id)),
    updateConditionStatus: (id, data) => dispatch(updateConditionStatus(id, data)),
    togglePromptModal: () => dispatch(togglePromptModal())
  }
}

const mapStateToProps = (state, props) => {
  const accountId = get(props, 'match.params.accountId', '');
  const accounts = get(state.firestore.ordered, 'accounts', []);
  const account = accounts.length > 0 && accounts.find(item => item.id === accountId)
  const conditions = get(state.firestore.ordered, 'conditions', []);
  return {
    accountId,
    account,
    auth: state.firebase.auth,
    conditions,
    isPromptModalVisible: state.app.isPromptModalVisible,
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [
    { 'collection': 'accounts' },
    {
      'collection': 'conditions',
      where: [
        ['accountId', '==', `${props.accountId}`],
      ],
    }
  ])
)(AccountDetails);