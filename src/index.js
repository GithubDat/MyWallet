import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'primereact/resources/themes/voclain/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import AddToWallet from './components/AddToWallet';
import ExpenseItem from './components/ExpenseItem';
import Home from './components/Home';
import './index.css';
import Header from './Header/Header';

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_SERVER_URL }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

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

const render = Component => {
  ReactDOM.render(
    <Router>
      <ApolloProvider client={client}>
        <Header />
        <PropsRoute exact path="/" component={Home} client={client} />
      </ApolloProvider>
    </Router>,
    document.getElementById('root')
  );
};

render(App);

// In development, hot module replacement (HMR) updates the application when
// changes are made, without having to refresh.
if (module.hot) {
  // eslint-disable-line no-undef
  module.hot.accept('./App', () => {
    // eslint-disable-line no-undef
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

registerServiceWorker();
