import { connect } from 'react-redux';
import RatingStarForm from './star_rating';

const mSTP = (state,ownProps) => {
  return {
  readOnly: ownProps.readOnly,
  rate: ownProps.rate
}
};
export default connect(mSTP, null)(RatingStarForm);