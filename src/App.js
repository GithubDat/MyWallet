import React, { Component } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  createBatchingNetworkInterface,
} from 'react-apollo';
import {
  BrowserRouter as Router,
  Route,
  PropsRoute,
  Switch,
  Link,
} from 'react-router-dom';
import AddToWallet from './components/AddToWallet';
import LoginPage from './containers/LoginPage';
import ExpenseItem from './components/ExpenseItem';
import Home from './components/Home';
import Header from './Header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/Expense" component={ExpenseItem} />
          <Route exact path="/AddToWallet" component={AddToWallet} />
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
