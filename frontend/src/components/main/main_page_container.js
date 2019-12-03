import { connect } from 'react-redux';
import MainPage from "./main_page";
import { fetchBusinesses } from '../../actions/business_actions';

const mapStateToProps = (state) => {
  
  const businesses = Object.values(state.entities.businesses);
  return {
    businesses,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBusinesses: (search) => dispatch(fetchBusinesses(search))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);