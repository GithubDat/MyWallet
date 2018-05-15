import React from 'react';
import { withRouter } from 'react-router-dom';
import MonthlyExpense from './MonthlyExpense';
import CategoriesExpense from './CategoriesExpense';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <div style={{ width: '600px', height: '325px' }}>
          <MonthlyExpense />
        </div>

        <div style={{ width: '600px', height: '325px' }}>
          <CategoriesExpense />
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
