import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddToWallet from './components/AddToWallet';
import LoginPage from './containers/LoginPage/LoginPage';
import ExpenseItem from './components/ExpenseItem';
import Home from './components/Home';
import Header from './Header/Header';
import Dashboard from './components/Dashboard';

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}
    />
  );
};

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/login" component={LoginPage} />
          <PropsRoute
            exact
            path="/home"
            component={Home}
            client={this.props.client}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
