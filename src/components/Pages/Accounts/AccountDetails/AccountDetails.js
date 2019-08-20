import React, { Component } from 'react';
import EditAccountModal from '../../../Modal/EditAccount/EditAccount';
import AddPromotionConditionModal from '../../../Modal/AddPromotionCondition/AddPromotionCondition';
import { togglePromptModal } from '../../../../store/actions/appActions';
import PromptModal from '../../../Modal/Prompt/Prompt';
import Portal from '../../../Portal/Modal';
import ConditionTile from '../ConditionTile/ConditionTile';
import { removePromotionCondition, updateConditionStatus } from '../../../../store/actions/conditionActions';
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

  render () {
    const { account: { accountName, status, startDate, totalPrize, bankId }, auth, conditions, removeCondition, updateConditionStatus, togglePromptModal } = this.props;
    const parsedStartDate = new Date(startDate).toLocaleDateString();
    if (!auth.uid) return <Redirect to="/login" />
    return (
      <div className={styles.ContentWrapper}>
        <div>
          <div className={styles.DetailsRow}>Nazwa: {accountName}</div>
          <div className={styles.StatusWrapper}>
            <div>Status: {status}</div>
            {status === 'active' ? (<span className={stylesMain.DotActive} />) : (<span className={stylesMain.DotInactive} />)}
          </div>
          <div className={styles.DetailsRow}>Data otwarcia: {parsedStartDate}</div>
          {totalPrize && <div className={styles.DetailsRow}>Wartość nagordy: {totalPrize} PLN</div>}

          <div className={styles.ButtonWrapper}>
            <button onClick={this.handleEditModal} className={styles.EditBtn}>Edycja</button>
            <button className={styles.AddPromotionBtn} onClick={this.handleTermPromotionsModal}>Dodaj warunek promocji konta</button>
          </div>
        </div>

        <div className={styles.ConditionsWrapper}>
          {conditions.map(item => {
            return (
              <ConditionTile
                item={item}
                key={item.id}
                setIdToRemove={this.setIdToRemove}
                updateConditionStatus={updateConditionStatus}
                togglePromptModal={togglePromptModal}
              />
            )
          })}
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