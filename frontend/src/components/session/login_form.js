import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoSubmit = this.handleDemoSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/');
    }

    this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  demoEffect(demoUser) {
    const that = this;
    let index = 0;
    const demoIntervalId = setInterval(() => {
      if (index < demoUser.username.length) {
        that.setState({
          username: this.state.username + demoUser.username[index]
        })
      }
      if (index < demoUser.password.length) {
        that.setState({
          password: this.state.password + demoUser.password[index]
        })
      }
      index++;
      if (index > demoUser.password.length && index > demoUser.username.length) {
        clearInterval(demoIntervalId);
        if (this.props.formSubmit === "Log in") {
          this.props.action(demoUser);
        } else {
          this.props.login(demoUser);
        }
      }
    }, 200)
  }

  handleDemoSubmit(e) {
    e.preventDefault();
    const demoUser = {username: "guest", password: "password"};
    this.demoEffect(demoUser);
  }

  handleSubmit(e) {
    e.preventDefault();
    let user;
    if(e.currentTarget.id == "btnSignup"){
      user = {
        username: this.state.username,
        password: this.state.password
      };
    }else if(e.currentTarget.id == "btnDemoLogin"){
      user = {
        username: "guest",
        password: "password"
      };
    }
    this.props.login(user)
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
            <Link to={'/'} ><img className="logo" src="stylesheets/images/javasiplogo.png" /></Link>
          </div>
        </div>
        <div className="signup-page-contents">
        <form className="signup-form">
          <div className="login-form">
            <p className="signup-description">Sign Up for JavaSip</p>
            <p className="signup-tagline"> Welcome Back</p>
              <input type="text"
                className="login-username"
                value={this.state.username}
                onChange={this.update('username')}
                placeholder="Username"
                className="session-input"
              />
            <br/>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
                className="session-input"
              />
            <br/>
            <button onClick={this.handleSubmit}  id="btnSignup" className="signup-btn">Log In</button>
            <button onClick={this.handleDemoSubmit}  id="btnDemoLogin" className="signup-btn demo-btn">Demo User</button>
          </div>
            <div className="redirect-login">
              <p className="redirect-description">New to JavaSip?</p>
              <Link className="redirect-login-link" to={'/signup'}>Sign Up</Link>
            </div>
            {this.renderErrors()}
        </form>
        <div className="signup-image">
          <img src="stylesheets/images/shop.png" />
        </div>  
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);