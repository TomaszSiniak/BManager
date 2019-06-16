

import { connect } from 'react-redux';
import MainContent from './MainContent';


const mapStateToProps = state => {
  return {
    menuVisible: state.app.isMenuVisible,
  }
}

export default connect(mapStateToProps)(MainContent);
