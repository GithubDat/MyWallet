import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import moment from 'moment';
import AccountMenu from './AccountMenu';
import { connect } from 'react-redux';
import backgroundImg from '../stylesheets/images/wallet-icon.png';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var today = new Date();
    const pathname = window.location.pathname;
    if (pathname !== '/') {
      return (
        <div id="header">
          <div id="header-content">
            <div>
              <img
                className="wallet_icon"
                src={backgroundImg}
                alt="logo"
                style={{ height: '50px', width: '50px' }}
              />
            </div>
            <p className="username_text">
              {' '}
              {'Welcome ' +
                this.props.userDetails.firstName +
                ' ' +
                this.props.userDetails.lastName}
            </p>
            <p className="date_text">{moment(today).format('DD/MM/YYYY')}</p>
            <AccountMenu
              submit={this.props.handleToggleProfile}
              logoutUser={this.props.logoutUser}
              loggedInEmail={this.props.userDetails.email_id}
              className="account-menu"
            />
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

Header.propTypes = {
  message: PropTypes.string,
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.object,
  userDetails: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    userDetails: state.loginReducer.userDetails,
  };
}

export default connect(mapStateToProps)(Header);
