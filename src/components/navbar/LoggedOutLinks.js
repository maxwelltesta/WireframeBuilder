import React from 'react';
import { NavLink } from 'react-router-dom';

class LoggedOutLinks extends React.Component {
  render() {
    return (
      <ul className = "right" >
        <li><NavLink to="/login" className="black-text">Login</NavLink></li>
        <li><NavLink to="/register" className="black-text">Register</NavLink></li>
      </ul>
    );
  }
}

export default LoggedOutLinks;