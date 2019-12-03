import { connect } from 'react-redux';
import Map from "./map";
import { fetchBusinesses } from '../../actions/business_actions';


const mapStateToProps = (state, ownProps) => {
  
  const businesses = ownProps.businesses;
  return {
    businesses,
    
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    fetchBusinesses: (search) => dispatch(fetchBusinesses(search))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);