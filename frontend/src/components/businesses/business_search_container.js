import { connect } from 'react-redux';
import BusinessSearch from "./business_search";
import { fetchBusinesses } from '../../actions/business_actions';


const mapStateToProps = (state, ownProps) => { 
  const search = (ownProps.match.params.search);
  const businesses = Object.values(state.entities.businesses);
  debugger;
  return{
    businesses,
    search 
  }  
}

const mapDispatchToProps = (dispatch) => {
   
  return{
    fetchBusinesses: (search) => dispatch(fetchBusinesses(search))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessSearch);