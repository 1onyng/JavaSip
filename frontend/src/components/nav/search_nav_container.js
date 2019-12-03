import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

import SearchNav from './search_nav';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

export default connect(
  mapStateToProps,
  { logout }
)(SearchNav);