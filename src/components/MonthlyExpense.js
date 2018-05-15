import React from 'react';
import { withRouter } from 'react-router-dom';
import { Chart } from 'primereact/components/chart/Chart';
class MonthlyExpense extends React.Component {
  render() {
    let result = [
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
        price: 256,
        createdAt: 'October',
      },
      {
        price: 656,
        createdAt: 'November',
      },
      {
        price: 456,
        createdAt: 'December',
      },
    ];

    let lable = [];
    let dataValue = [];
    result.forEach(function(a) {
      lable.push(a.createdAt);
      dataValue.push(a.price);
    }, Object.create(null));
    const data = {
      labels: lable,
      datasets: [
        {
          data: dataValue,
          fill: true,
          borderColor: '#4bc0c0',
          backgroundColor: '#42A5F5',
        },
      ],
    };

    const options = {
      title: {
        display: true,
        text: 'Monthly Expense',
        fontSize: 16,
      },
      legend: {
        display: false,
        position: 'bottom',
      },
    };

    return <Chart type="bar" data={data} options={options} />;
  }
}

export default withRouter(MonthlyExpense);
