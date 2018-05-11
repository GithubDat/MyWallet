import React from 'react';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import {removeExpense, addExpense, fetchExpenses} from './actions/index';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import ExpenseItem from './ExpenseItem';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Dialog } from 'primereact/components/dialog/Dialog';
import { Button } from 'primereact/components/button/Button';
import { Dropdown } from 'primereact/components/dropdown/Dropdown';
import { InputTextarea } from 'primereact/components/inputtextarea/InputTextarea';
import '../dist/home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      cars: [
        {
          category: 'Volkswagen',
          subCategory: 'Volkswagen',
          unit: '1',
          quantity: '10',
          item: 'White',
          date: '18/10/2017',
          comment: ' Good Quality',
          amount: '$200000',
          provider: 'Volkswagen',
        },
        {
          category: 'Audi',
          subCategory: 'Audi',
          unit: '1',
          quantity: '10',
          item: 'White',
          date: '18/10/2017',
          comment: ' Good Quality',
          amount: '$200000',
          provider: 'Audi',
        },
        {
          category: 'Renault',
          subCategory: 'Renault',
          unit: '1',
          quantity: '10',
          item: 'White',
          date: '18/10/2017',
          comment: ' Good Quality',
          amount: '$200000',
          provider: 'Renault',
        },
        {
          category: 'BMW',
          subCategory: 'BMW',
          unit: '1',
          quantity: '10',
          item: 'White',
          date: '18/10/2017',
          comment: ' Good Quality',
          amount: '$200000',
          provider: 'BMW',
        },
        {
          category: 'Mercedes',
          subCategory: 'Mercedes',
          unit: '1',
          quantity: '10',
          item: 'White',
          date: '18/10/2017',
          comment: ' Good Quality',
          amount: '$200000',
          provider: 'Mercedes',
        },
        {
          category: 'Volvo',
          subCategory: 'Volvo',
          unit: '1',
          quantity: '10',
          item: 'White',
          date: '18/10/2017',
          comment: ' Good Quality',
          amount: '$200000',
          provider: 'Volvo',
        },
        {
          category: 'Honda',
          subCategory: 'Honda',
          unit: '1',
          quantity: '10',
          item: 'White',
          date: '18/10/2017',
          comment: ' Good Quality',
          amount: '$200000',
          provider: 'Honda',
        },
        {
          category: 'Jaguar',
          subCategory: 'Jaguar',
          unit: '1',
          quantity: '10',
          item: 'White',
          date: '18/10/2017',
          comment: ' Good Quality',
          amount: '$200000',
          provider: 'Jaguar',
        },
        {
          category: 'Ford',
          subCategory: 'Ford',
          unit: '1',
          quantity: '10',
          item: 'White',
          date: '18/10/2017',
          comment: ' Good Quality',
          amount: '$200000',
          provider: 'Ford',
        },
        {
          category: 'Fait',
          subCategory: 'Fait',
          unit: '1',
          quantity: '10',
          item: 'White',
          date: '18/10/2017',
          comment: ' Good Quality',
          amount: '$200000',
          provider: 'Fait',
        },
      ],
    };
    this.cols = [
      { field: 'category', header: 'Category' },
      { field: 'subCategory', header: 'Sub Category' },
      { field: 'date', header: 'Date' },
      { field: 'item', header: 'Item' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'amount', header: 'Amount' },
      { field: 'unit', header: 'Unit' },
      { field: 'provider', header: 'Provider' },
      { field: 'comment', header: 'Comment' },
    ];
  }
  removeExpense(key) {
    this.props.removeExpense(key);
  }

  addNew() {
    this.newCar = true;
    this.setState({
      car: {
        category: 'Yamaha',
        subCategory: 'Yamaha',
        unit: '1',
        quantity: '10',
        item: 'White',
        date: '18/10/2017',
        comment: ' Good Quality',
        amount: '$200000',
        provider: 'Yamaha',
      },
      displayDialog: true,
    });
  }

  findSelectedCarIndex() {
    return this.state.cars.indexOf(this.state.selectedCar);
  }

  save() {
    let cars = [...this.state.cars];
    if (this.newCar) cars.push(this.state.car);
    else cars[this.findSelectedCarIndex()] = this.state.car;

    this.setState({
      cars: cars,
      selectedCar: null,
      car: null,
      displayDialog: false,
    });
  }

  onCarSelect(e) {
    this.newCar = false;
    this.setState({
      displayDialog: true,
      car: Object.assign({}, e.data),
    });
  }

  delete() {
    let index = this.findSelectedCarIndex();
    this.setState({
      cars: this.state.cars.filter((val, i) => i !== index),
      selectedCar: null,
      car: null,
      displayDialog: false,
    });
  }

  updateProperty(property, value) {
    let car = this.state.car;
    car[property] = value;
    this.setState({ car: car });
  }
  render() {
    var dynamicColumns = this.cols.map((col, i) => {
      return (
        <Column
          key={col.field}
          className={'data-table-coloumn__' + col.field}
          field={col.field}
          header={col.header}
          sortable={true}
          filter={true}
          style={{ width: '140px' }}
        />
      );
    });
    var header = (
      <div style={{ textAlign: 'left' }}>
        <i className="fa fa-search" style={{ margin: '4px 4px 0 0' }} />
        <InputText
          type="search"
          onInput={e => this.setState({ globalFilter: e.target.value })}
          placeholder="Global Search"
          size="25"
        />
      </div>
    );
    let footer = (
      <div
        className="ui-helper-clearfix"
        style={{ maxWidth: '11%', height: '30px' }}
      >
        <Button
          style={{ float: 'left' }}
          icon="fa-plus"
          label="Add Expense"
          onClick={this.addNew.bind(this)}
        />
      </div>
    );
    let dialogFooter = (
      <div className="ui-dialog-buttonpane ui-helper-clearfix ui-grid">
        <Button
          icon="fa-close"
          label="Delete"
          className="ui-grid-col-4"
          onClick={this.delete.bind(this)}
        />
        <Button
          label="Save"
          icon="fa-check"
          className="ui-grid-col-4"
          onClick={this.save.bind(this)}
        />
      </div>
    );
    return (
      <div className="data-table">
        <DataTable
          value={this.state.cars}
          style={{ fontSize: 'small' }}
          responsive={true}
          paginator={true}
          rows={10}
          sortMode="multiple"
          header={header}
          globalFilter={this.state.globalFilter}
          scrollable={true}
          footer={footer}
          selectionMode="single"
          selection={this.state.selectedCar}
          onSelectionChange={e => {
            this.setState({ selectedCar: e.data });
          }}
          onRowSelect={this.onCarSelect.bind(this)}
        >
          {dynamicColumns}
        </DataTable>
        <Dialog
          visible={this.state.displayDialog}
          header="Add/Edit Expense"
          modal={true}
          footer={dialogFooter}
          onHide={() => this.setState({ displayDialog: false })}
        >
          {this.state.car && (
            <div className="ui-grid ui-grid-responsive ui-fluid">
              <div className="ui-grid-row">
                <div className="ui-grid-col-4" style={{ padding: '4px 10px' }}>
                  <label htmlFor="provider">Provider</label>
                </div>
                <div className="ui-grid-col-8" style={{ padding: '4px 10px' }}>
                  <InputText
                    id="provider"
                    onChange={e => {
                      this.updateProperty('provider', e.target.value);
                    }}
                    value={this.state.car.vin}
                  />
                </div>
              </div>
              <div className="ui-grid-row">
                <div className="ui-grid-col-4" style={{ padding: '4px 10px' }}>
                  <label htmlFor="category">Category</label>
                </div>
                <div className="ui-grid-col-8" style={{ padding: '4px 10px' }}>
                  <Dropdown
                    id="category"
                    style={{ width: '100%' }}
                    placeholder="Category"
                  />
                </div>
              </div>
              <div className="ui-grid-row">
                <div className="ui-grid-col-4" style={{ padding: '4px 10px' }}>
                  <label htmlFor="subCategory">Sub Category</label>
                </div>
                <div className="ui-grid-col-8" style={{ padding: '4px 10px' }}>
                  <Dropdown
                    id="subCategory"
                    style={{ width: '100%' }}
                    placeholder="Sub Category"
                  />
                </div>
              </div>
              <div className="ui-grid-row">
                <div className="ui-grid-col-4" style={{ padding: '4px 10px' }}>
                  <label htmlFor="item">Item</label>
                </div>
                <div className="ui-grid-col-8" style={{ padding: '4px 10px' }}>
                  <InputText
                    id="item"
                    onChange={e => {
                      this.updateProperty('item', e.target.value);
                    }}
                    value={this.state.car.color}
                  />
                </div>
              </div>
              <div className="ui-grid-row">
                <div className="ui-grid-col-4" style={{ padding: '4px 10px' }}>
                  <label htmlFor="unit">Unit</label>
                </div>
                <div className="ui-grid-col-8" style={{ padding: '4px 10px' }}>
                  <InputText
                    id="unit"
                    onChange={e => {
                      this.updateProperty('unit', e.target.value);
                    }}
                    value={this.state.car.color}
                  />
                </div>
              </div>
              <div className="ui-grid-row">
                <div className="ui-grid-col-4" style={{ padding: '4px 10px' }}>
                  <label htmlFor="quantity">Quantity</label>
                </div>
                <div className="ui-grid-col-8" style={{ padding: '4px 10px' }}>
                  <InputText
                    id="quantity"
                    onChange={e => {
                      this.updateProperty('quantity', e.target.value);
                    }}
                    value={this.state.car.color}
                  />
                </div>
              </div>
              <div className="ui-grid-row">
                <div className="ui-grid-col-4" style={{ padding: '4px 10px' }}>
                  <label htmlFor="comment">Comment</label>
                </div>
                <div className="ui-grid-col-8" style={{ padding: '4px 10px' }}>
                  <InputTextarea
                    id="comment"
                    rows={5}
                    cols={30}
                    autoResize={true}
                  />
                </div>
              </div>
            </div>
          )}
        </Dialog>
      </div>
    );
  }
}
export default Home;
