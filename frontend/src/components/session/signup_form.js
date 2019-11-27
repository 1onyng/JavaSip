import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      let user = {
        username: this.state.username,
        password: this.state.password
      };
      this.props.login(user);
      this.props.history.push('/');
    }

    this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.signup(user, this.props.history);
  }

  renderErrors() {
    return(
      <ul className="session-errors">
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="login-form-container">
        <div className="signup-header">
          <div className="signup-logo">
            <Link to={'/'} ><img className="logo" src="stylesheets/images/javalogo.png" /></Link>
          </div>
        </div>
        <div className="signup-page-contents">
        <form onSubmit={this.handleSubmit} className="signup-form">
          <div className="login-form">
            <p className="signup-description">Sign Up for JavaSip</p>
              <p className="signup-tagline"> Connect with amazing local coffee shops</p>
            <br/>
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                placeholder="Username"
              />
            <br/>
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="Email"
              />
            <br/>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
              />
            <br/>
              <input type="password"
                value={this.state.password2}
                onChange={this.update('password2')}
                placeholder="Confirm Password"
              />
            <br/>
            <button className="signup-btn">Sign Up</button>
          </div>
          <div className="redirect-login">
          <p className="redirect-description">Already on JavSip?</p>
              <Link className="redirect-login-link" to={'/login'}>Log In</Link>
          </div>
            {this.renderErrors()}
        </form>
        <div className="signup-image"> 
          <img src="stylesheets/images/shop.png"/>
        </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);