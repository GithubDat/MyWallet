import createBrowserHistory from 'history/createBrowserHistory';

import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import App from './App';
import './index.css';

import Header from './Header/Header';

const history = createBrowserHistory();
const store = configureStore(history);

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
    <Provider store={store}>
      <Router>
        <ApolloProvider client={client}>
          <Component />
        </ApolloProvider>
      </Router>
    </Provider>,
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
