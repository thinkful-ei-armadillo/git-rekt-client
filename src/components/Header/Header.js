import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import UserContext from "../../context/UserContext";
import "./Header.css";

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div className="logged-in-header">
        <span className="userName">Hello {this.context.user.name}!</span>
        <nav>
          <Link className="logout" to="/message">
            Send Message via Slack
          </Link>
          <Link className="logout" onClick={this.handleLogoutClick} to="/login">
            Logout
          </Link>
        </nav>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <nav className="logged-out-header">
        <Link className="register" to="/register">
          Sign up
        </Link>
        <Link className="login" to="/login">
          Login
        </Link>{" "}
      </nav>
    );
  }

  render() {
    return (
      <header>
        <h1 className="header">
          <Link className="gitRekt" to="/">
            Git-Rekt
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header;
