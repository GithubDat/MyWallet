import React from 'react';
import { withRouter } from 'react-router-dom';
import { Chart } from 'primereact/components/chart/Chart';
import CategoryExpense from './CategoryExpense';
class CategoriesExpense extends React.Component {
  state = {
    isVisible: false,
  };

  showDetails(points, evt) {
    this.setState({ isVisible: true });
  }

  render() {
    let result = [
      {
        CategoryId: 1,
        CategoryName: 'Grocery',
        data: [
          {
            price: 290,
            createdAt: 'January',
          },
          {
            price: 345,
            createdAt: 'February',
          },
          {
            price: 675,
            createdAt: 'March',
          },
          {
            price: 234,
            createdAt: 'April',
          },
          {
            price: 566,
            createdAt: 'May',
          },
          {
            price: 233,
            createdAt: 'June',
          },
          {
            price: 290,
            createdAt: 'July',
          },
          {
            price: 984,
            createdAt: 'August',
          },
          {
            price: 456,
            createdAt: 'September',
          },
          {
            price: 456,
            createdAt: 'October',
          },
          {
            price: 456,
            createdAt: 'November',
          },
          {
            price: 456,
            createdAt: 'December',
          },
        ],
      },
      {
        CategoryId: 2,
        CategoryName: 'clothing',
        data: [
          {
            price: 250,
            createdAt: 'January',
          },
          {
            price: 335,
            createdAt: 'February',
          },
          {
            price: 475,
            createdAt: 'March',
          },
          {
            price: 534,
            createdAt: 'April',
          },
          {
            price: 666,
            createdAt: 'May',
          },
          {
            price: 273,
            createdAt: 'June',
          },
          {
            price: 390,
            createdAt: 'July',
          },
          {
            price: 484,
            createdAt: 'August',
          },
          {
            price: 556,
            createdAt: 'September',
          },
          {
            price: 456,
            createdAt: 'October',
          },
          {
            price: 656,
            createdAt: 'November',
          },
          {
            price: 156,
            createdAt: 'December',
          },
        ],
      },
    ];

    let lable = [];
    result[0].data.forEach(function(a) {
      lable.push(a.createdAt);
    }, Object.create(null));

    let dataSets = [];
    result.forEach(function(category) {
      let data = [];
      category.data.forEach(function(a) {
        data.push(a.price);
      });
      dataSets.push({
        data: data,
        fill: false,
        borderColor: '#4bc0c0',
        backgroundColor: '#42A5F5',
        CategoryId: category.CategoryId,
      });
    });
    const data = {
      labels: lable,
      datasets: dataSets,
    };

    const options = {
      title: {
        display: true,
        text: 'Category Expense',
        fontSize: 16,
      },
      legend: {
        display: false,
        position: 'bottom',
      },
      onClick: this.showDetails.bind(this),
    };

    return (
      <div>
        <Chart id="catChart" type="bar" data={data} options={options} />
        {this.state.isVisible && (
          <div style={{ width: '600px', height: '325px' }}>
            <CategoryExpense />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(CategoriesExpense);
