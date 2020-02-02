import React from 'react';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
    };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const location = this.state.location;
    if (this.props.history.location.pathname !== "/search") {
      this.props.history.push({
        pathname: "/search",
        search: location,
      });
    }
    else {
      let arr = location.split(" ");
      let str = arr.join("%20")
      this.props.history.push(`/search?${str}`)
    }
  }

  update(e) {
    this.setState({ location: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="search-bar">     
          <p className="search-bar-how">Coffee Shops In</p>
          <input type="text" className="search-input"
            value={this.state.location}
            onChange={this.update}
            placeholder="Oakland, San Francisco, or San Jose" />
          <Link to={`/search/${this.state.location}`}><button className="search-bar-submit"><i className="fas fa-search"></i></button></Link>
        </div>
      </form >
    );
  }
}

export default SearchBar;