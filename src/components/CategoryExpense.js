import React from 'react';
import { withRouter } from 'react-router-dom';
import { Chart } from 'primereact/components/chart/Chart';
class CategoryExpense extends React.Component {
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  render() {
    let result = [
      {
        price: 290,
        SubCategory: 'Sugar',
      },
      {
        price: 345,
        SubCategory: 'Rice',
      },
      {
        price: 675,
        SubCategory: 'Dal',
      },
      {
        price: 234,
        SubCategory: 'Milk',
      },
      {
        price: 566,
        SubCategory: 'Egg',
      },
    ];

    let lable = [];
    let dataValue = [];
    let backgroundColor = [];
    result.forEach(async a => {
      lable.push(a.SubCategory);
      dataValue.push(a.price);
      let color = await this.getRandomColor();
      backgroundColor.push(color);
    }, Object.create(null));

    const data = {
      labels: lable,
      datasets: [
        {
          data: dataValue,
          borderColor: '#4bc0c0',
          backgroundColor: backgroundColor,
        },
      ],
    };

    const options = {
      title: {
        display: true,
        text: 'Monthly Category Expense',
        fontSize: 16,
      },
      legend: {
        display: false,
        position: 'bottom',
      },
    };

    return <Chart type="pie" data={data} options={options} />;
  }
}

export default withRouter(CategoryExpense);
