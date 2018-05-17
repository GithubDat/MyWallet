import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import AccountMenu from './AccountMenu';

const Header = ({
  message,
  logoutUser,
  handleToggleProfile,
  quickAddMessage,
  quickAddError,
}) => {
  const pathname = window.location.pathname;
  if (pathname !== '/') {
    return (
      <div id="header">
        <div id="header-content">
          <h5>My Wallet</h5>
          <p className="username_text">Pavana S N</p>
          <p className="date_text">5/18/2018</p>
          <AccountMenu
            submit={handleToggleProfile}
            logoutUser={logoutUser}
            loggedInEmail="Pavana.narasanna@cognizant.com"
            className="account-menu"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div id="header">
        <div id="header-content" />
      </div>
    );
  }
};

Header.propTypes = {
  message: PropTypes.string,
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.object,
};

export default Header;
