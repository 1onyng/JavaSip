import React from 'react';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
    };
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render() {
    return (
        <div className="search-bar">
            <p className="search-bar-how">Coffee Shops Near</p>
            <input type="text" className="search-input"
              value={this.state.location}
              onChange={this.update('location')}
              placeholder="Oakland" />

            <Link to={`/search/${this.state.location}`}><button className="search-bar-submit"><i className="fas fa-search"></i></button></Link>
          </div>
    );
  }
}

export default SearchBar;