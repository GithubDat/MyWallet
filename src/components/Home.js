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
import Select from 'react-select';
import '../stylesheets/_select-feild.css';
import { UnsubscriptionError } from 'rxjs';
import { Query, Mutation, graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const CATEGORY_QUERY = gql`
  query getCategory {
    category {
      categoryName
      id
      userId
    }
  }
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [
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
      multi: true,
      multiSub: true,
      multiValue: [],
      multiValuesub: [],
      categoryValue: 'undefined',
      subCategoryValue: 'Hello',
      category: [
        { value: 'R', label: 'Grocery' },
        { value: 'G', label: 'Clothes' },
        { value: 'B', label: 'Makeup' },
      ],
      subCategory: [
        { value: 'O', label: 'Oils' },
        { value: 'V', label: 'Vegetables' },
        { value: 'S', label: 'Sauces' },
      ],
    };

    let categoryValue = [];
    let expenseValue = [];
    let userId = 1;
    this.props.client
      .query({
        query: gql`
          query getExpense($userId: Int) {
            expense(userId: $userId) {
              CATEGORY {
                categoryName
              }
              SUBCATEGORY {
                subCategoryName
              }
              quantity
              item
              amount: price
              date: createdAt
              provider
              unit
            }
          }
        `,
      })
      .then(resp => {
        for (var i = 0; i < resp.data.expense.length; i++) {
          let expenseValueObj = {};
          (expenseValueObj.category =
            resp.data.expense[i].CATEGORY.categoryName),
            (expenseValueObj.subCategory =
              resp.data.expense[i].SUBCATEGORY.subCategoryName),
            (expenseValueObj.item = resp.data.expense[i].item),
            (expenseValueObj.quantity = resp.data.expense[i].quantity),
            (expenseValueObj.amount = resp.data.expense[i].amount),
            (expenseValueObj.date = resp.data.expense[i].date),
            (expenseValueObj.provider = resp.data.expense[i].provider),
            (expenseValueObj.unit = resp.data.expense[i].unit),
            (expenseValueObj.comment = 'resp.data.expense[i].comment'),
            expenseValue.push(expenseValueObj);
          console.log('expense', expenseValue);
        }
        this.setState({
          expenses: expenseValue,
        });
      });

    this.props.client
      .query({
        query: gql`
          query getCategory($userId: Int!) {
            category(userId: $userId) {
              categoryName
              id
              userId
            }
          }
        `,
        variables: {
          userId: userId,
        },
      })
      .then(resp => {
        for (var i = 0; i < resp.data.category.length; i++) {
          let categoryValueObj = {};
          (categoryValueObj.label = resp.data.category[i].categoryName),
            (categoryValueObj.value = resp.data.category[i].id),
            categoryValue.push(categoryValueObj);
        }
        this.setState({
          category: categoryValue,
        });
      });

    this.cols = [
      { field: 'category', header: 'Category' },
      { field: 'subCategory', header: 'Sub Category' },
      { field: 'date', header: 'Date' },
      { field: 'item', header: 'Item' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'amount', header: 'Amount' },
      { field: 'unit', header: 'Unit' },
      { field: 'provider', header: 'Provider' },
      // { field: 'comment', header: 'Comment' },
    ];
  }
  removeExpense(key) {
    this.props.removeExpense(key);
  }

  addNew() {
    this.newExpense = true;
    this.setState({
      expense: {
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
      expenseEditFlag: false,
    });
  }

  findSelectedCarIndex() {
    return this.state.expenses.indexOf(this.state.selectedExpense);
  }

  save() {
    let expenses = [...this.state.expenses];
    if (this.newExpense) expenses.push(this.state.expense);
    else expenses[this.findSelectedCarIndex()] = this.state.expense;

    this.setState({
      expenses: expenses,
      selectedExpense: null,
      expense: null,
      displayDialog: false,
    });
  }

  handleOnRowSelect(e) {
    this.newExpense = false;
    let categoryValue = [];
    let categoryValueObj = {};
    (categoryValueObj.label = e.data.category),
      categoryValue.push(categoryValueObj);
    let subCategoryValue = [];
    let subCategoryValueObj = {};
    (subCategoryValueObj.label = e.data.subCategory),
      subCategoryValue.push(subCategoryValueObj);
    this.setState({
      multiValue: categoryValue,
      multiValuesub: subCategoryValue,
      displayDialog: true,
      expenseEditFlag: true,
      expense: Object.assign({}, e.data),
    });
  }

  cancel() {
    if (this.state.expenseEditFlag) {
      let index = this.findSelectedCarIndex();
      this.setState({
        expenses: this.state.expenses.filter((val, i) => i !== index),
        selectedExpense: null,
        expense: null,
        displayDialog: false,
      });
    } else {
      this.setState({
        displayDialog: false,
      });
    }
  }

  updateProperty(property, value) {
    let expense = this.state.expense;
    expense[property] = value;
    this.setState({ expense: expense });
  }
  handleOnChange(value) {
    let subCategoryValue = [];
    const { multi } = this.state;
    let expenseObj = Object.assign({}, this.state.expense);
    if (value.length > 0) {
      expenseObj.category = value[0].label;
    }
    if (multi) {
      this.setState({ multiValue: value, expense: expenseObj });
    } else {
      this.setState({ value });
    }
    if (value.length > 0) {
      let categoryId = value[0].value;
      console.log('catId', categoryId);
      let userId = 1;
      this.props.client
        .query({
          query: gql`
            query getSubCategory($userId: Int!, $categoryId: Int!) {
              subcategory(userId: $userId, categoryId: $categoryId) {
                subCategoryName
                id
                userId
              }
            }
          `,
          variables: {
            userId: userId,
            categoryId: categoryId,
          },
        })

        .then(resp => {
          console.log('subca', resp.data.subcategory);
          for (var i = 0; i < resp.data.subcategory.length; i++) {
            let subCategoryValueObj = {};
            (subCategoryValueObj.label =
              resp.data.subcategory[i].subCategoryName),
              (subCategoryValueObj.value = resp.data.subcategory[i].id),
              subCategoryValue.push(subCategoryValueObj);
          }
          this.setState({
            subCategory: subCategoryValue,
          });
        });
    }
  }

  handleOnChangeSubCategory(value) {
    const { multiSub } = this.state;
    let expenseObj = Object.assign({}, this.state.expense);
    if (value.length > 0) {
      expenseObj.subCategory = value[0].label;
    }
    if (multiSub) {
      this.setState({ multiValuesub: value, expense: expenseObj });
    } else {
      this.setState({ value });
    }
  }

  handleOnChangeComment(e) {
    let expenseObj = Object.assign({}, this.state.expense);
    expenseObj.comment = e.target.value;
    this.setState({ expense: expenseObj });
  }

  render() {
    const { multi, multiValue, multiSub, multiValuesub } = this.state;
    var dynamicColumns = this.cols.map((col, i) => {
      return (
        <Column
          key={col.field}
          className={'data-table-coloumn__' + col.field + ' column'}
          field={col.field}
          header={col.header}
          sortable={true}
          filter={true}
        />
      );
    });
    var header = (
      <div style={{ textAlign: 'left' }}>
        <i className="fa fa-search header" />
        <InputText
          type="search"
          onInput={e => this.setState({ globalFilter: e.target.value })}
          placeholder="Global Search"
          size="25"
        />
      </div>
    );
    let footer = (
      <div className="ui-helper-clearfix footer">
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
          label={this.state.expenseEditFlag ? 'Delete' : 'Cancel'}
          className="ui-grid-col-4"
          onClick={this.cancel.bind(this)}
        />
        <Button
          label={this.state.expenseEditFlag ? 'Edit' : 'Save'}
          icon="fa-check"
          className="ui-grid-col-4"
          onClick={this.save.bind(this)}
        />
      </div>
    );
    return (
      <div className="data-table">
        <DataTable
          value={this.state.expenses}
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
          selection={this.state.selectedExpense}
          onSelectionChange={e => {
            this.setState({ selectedExpense: e.data });
          }}
          onRowSelect={this.handleOnRowSelect.bind(this)}
        >
          {dynamicColumns}
        </DataTable>
        <Dialog
          visible={this.state.displayDialog}
          header={this.state.expenseEditFlag ? 'Edit Expense' : 'Add Expense'}
          modal={true}
          footer={dialogFooter}
          onHide={() => this.setState({ displayDialog: false })}
        >
          {this.state.expense && (
            <div className="ui-grid ui-grid-responsive ui-fluid">
              <div className="ui-grid-row">
                <div className="ui-grid-col-4 ui-cell-column">
                  <label htmlFor="provider">Provider</label>
                </div>
                <div className="ui-grid-col-8 ui-cell-column">
                  <InputText
                    id="provider"
                    onChange={e => {
                      this.updateProperty('provider', e.target.value);
                    }}
                    value={this.state.expense.provider}
                  />
                </div>
              </div>
              <div className="ui-grid-row">
                <div className="ui-grid-col-4 ui-cell-column">
                  <label htmlFor="category">Category</label>
                </div>
                <div className="ui-grid-col-8 ui-cell-column">
                  {/* <SelectField placeholder="Category" 
                    values={this.state.category}
                    value={this.state.expense.category}
                    style={{ width: '100%' }}
                  /> */}
                  <div className="section">
                    <Select.Creatable
                      multi={multi}
                      options={this.state.category}
                      onChange={this.handleOnChange.bind(this)}
                      value={multi ? multiValue : this.props.categoryValue}
                      placeholder="Category"
                    />
                  </div>
                </div>
              </div>
              <div className="ui-grid-row">
                <div className="ui-grid-col-4 ui-cell-column">
                  <label htmlFor="subCategory">Sub Category</label>
                </div>
                <div className="ui-grid-col-8 ui-cell-column">
                  <div className="section">
                    <Select.Creatable
                      multi={multiSub}
                      options={this.state.subCategory}
                      onChange={this.handleOnChangeSubCategory.bind(this)}
                      value={
                        multiSub ? multiValuesub : this.props.subCategoryValue
                      }
                      placeholder="Sub-Category"
                    />
                  </div>
                </div>
              </div>
              <div className="ui-grid-row">
                <div className="ui-grid-col-4 ui-cell-column">
                  <label htmlFor="item">Item</label>
                </div>
                <div className="ui-grid-col-8 ui-cell-column">
                  <InputText
                    id="item"
                    onChange={e => {
                      this.updateProperty('item', e.target.value);
                    }}
                    value={this.state.expense.item}
                  />
                </div>
              </div>
              <div className="ui-grid-row">
                <div className="ui-grid-col-4 ui-cell-column">
                  <label htmlFor="unit">Unit</label>
                </div>
                <div className="ui-grid-col-8 ui-cell-column">
                  <InputText
                    id="unit"
                    onChange={e => {
                      this.updateProperty('unit', e.target.value);
                    }}
                    value={this.state.expense.unit}
                  />
                </div>
              </div>
              <div className="ui-grid-row">
                <div className="ui-grid-col-4 ui-cell-column">
                  <label htmlFor="quantity">Quantity</label>
                </div>
                <div className="ui-grid-col-8 ui-cell-column">
                  <InputText
                    id="quantity"
                    onChange={e => {
                      this.updateProperty('quantity', e.target.value);
                    }}
                    value={this.state.expense.quantity}
                  />
                </div>
              </div>
              {/* <div className="ui-grid-row">
                <div className="ui-grid-col-4 ui-cell-column">
                  <label htmlFor="comment">Comment</label>
                </div>
                <div className="ui-grid-col-8 ui-cell-column">
                  <InputTextarea
                    id="comment"
                    rows={5}
                    cols={30}
                    autoResize={true}
                    value={this.state.expense.comment}
                    onChange={(e) => this.handleOnChangeComment(e)}
                  />
                </div>
              </div> */}
            </div>
          )}
        </Dialog>
      </div>
    );
  }
}
export default Home;
