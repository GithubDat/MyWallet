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
    result.forEach(a => {
      lable.push(a.SubCategory);
      dataValue.push(a.price);
      let color = this.getRandomColor();
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
        text: 'Monthly Breakup',
        fontSize: 16,
      },
      legend: {
        display: true,
        position: 'right',
      },
      animation: {
        duration: 1,
        onComplete: function() {
          var chartInstance = this.chart,
            ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.fillStyle = 'red';
          ctx.font = '20px Arial';

          this.data.datasets.forEach(function(dataset, i) {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function(bar, index) {
              var data = dataset.data[index];
              var mid_radius =
                bar._model.innerRadius +
                (bar._model.outerRadius - bar._model.innerRadius) / 2;
              var start_angle = bar._model.startAngle;
              var end_angle = bar._model.endAngle;
              var mid_angle = start_angle + (end_angle - start_angle) / 2;
              var x = mid_radius * Math.cos(mid_angle);
              var y = mid_radius * Math.sin(mid_angle);
              ctx.fillText(data, bar._model.x + x, bar._model.y + y);
            });
          });
        },
      },
    };

    return <Chart type="pie" data={data} options={options} />;
  }
}

export default withRouter(CategoryExpense);
