import { connect } from 'react-redux';
import BusinessSearch from "./business_search";
import { fetchBusinesses }from '../../actions/business_actions';


const mapStateToProps = (state) => {
  return{
    businesses: Object.values(state.entities.businesses)
  }  
}

const mapDispatchToProps = (dispatch) => {
  return{
    fetchBusinesses: (search, bounds) => dispatch(fetchBusinesses(search, bounds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessSearch);