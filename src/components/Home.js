import React from 'react';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
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

const EXPENSE_MUTATION = gql`
  mutation addExpense(
    $subCategoryId: Int!
    $categoryId: Int!
    $item: String!
    $quantity: String!
    $unit: String!
    $provider: String!
    $price: String!
    $userId: Int!
  ) {
    manageExpense(
      expenseData: {
        subCategoryId: $subCategoryId
        categoryId: $categoryId
        item: $item
        quantity: $quantity
        unit: $unit
        provider: $provider
        price: $price
        userId: $userId
      }
    ) {
      expense {
        category: CATEGORY {
          categoryName
        }
        subcategory: SUBCATEGORY {
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
  }
`;

const CATEGORY_MUTATION = gql`
  mutation addcategory($categoryName: String!, $userId: Int!) {
    manageCategory(
      categoryData: { categoryName: $categoryName, userId: $userId }
    ) {
      category {
        categoryName
        id
      }
    }
  }
`;

const SUBCATEGORY_MUTATION = gql`
  mutation addsubcategory(
    $subCategoryName: String!
    $userId: Int!
    $categoryId: Int!
  ) {
    manageSubCategory(
      subCategoryData: {
        subCategoryName: $subCategoryName
        userId: $userId
        categoryId: $categoryId
      }
    ) {
      subCategory {
        subCategoryName
        id
      }
    }
  }
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      multi: true,
      multiSub: true,
      multiValue: [],
      multiValuesub: [],
      categoryValue: 'undefined',
      subCategoryValue: 'Hello',
      category: [{ value: 1, label: 'Grocery' }],
      subCategory: [{ value: 1, label: 'Oils' }],
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
        variables: {
          userId: userId,
        },
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
        category: '',
        subCategory: '',
        unit: '',
        quantity: '',
        item: '',
        date: '',
        comment: '',
        amount: '100',
        provider: '',
      },
      displayDialog: true,
      expenseEditFlag: false,
    });
  }

  findSelectedCarIndex() {
    return this.state.expenses.indexOf(this.state.selectedExpense);
  }

  save(e) {
    let expenses = [...this.state.expenses];
    let expenseData = this.newExpense;
    if (this.newExpense) {
      this.props.client
        .mutate({
          mutation: EXPENSE_MUTATION,
          variables: {
            subCategoryId: parseInt(this.state.multiValuesub[0].value),
            categoryId: parseInt(this.state.multiValue[0].value),
            item: this.state.expense.item,
            quantity: this.state.expense.quantity,
            unit: this.state.expense.unit,
            provider: this.state.expense.provider,
            price: this.state.expense.amount,
            userId: 1,
          },
        })
        .then(resp => {
          let responseExpense = {};
          (responseExpense.category =
            resp.data.manageExpense.expense.category.categoryName),
            (responseExpense.subCategory =
              resp.data.manageExpense.expense.subcategory.subCategoryName),
            (responseExpense.unit = resp.data.manageExpense.expense.unit),
            (responseExpense.quantity =
              resp.data.manageExpense.expense.quantity),
            (responseExpense.item = resp.data.manageExpense.expense.item),
            (responseExpense.date = resp.data.manageExpense.expense.date),
            (responseExpense.amount = resp.data.manageExpense.expense.amount),
            (responseExpense.provider =
              resp.data.manageExpense.expense.provider),
            expenses.push(responseExpense);
          console.log(expenses);
        });
    } else expenses[this.findSelectedCarIndex()] = this.state.expense;

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
    console.log('value', value);
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

  handleOnClickCategory(value) {
    let categorys = [...this.state.category];
    this.props.client
      .mutate({
        mutation: CATEGORY_MUTATION,
        variables: {
          categoryName: value.value,
          userId: 1,
        },
      })
      .then(resp => {
        let categoryvalue = [];
        let categoryValueObj = {};
        (categoryValueObj.label =
          resp.data.manageCategory.category.categoryName),
          (categoryValueObj.value = resp.data.manageCategory.category.id),
          categorys.push(categoryValueObj);
        categoryvalue.push(categoryValueObj);
        this.setState({ multiValue: categoryvalue, category: categorys });
      });
  }
  handleOnClickSubCategory(value) {
    console.log(this.state.multiValue);
    let subCategorys = [...this.state.subCategory];
    this.props.client
      .mutate({
        mutation: SUBCATEGORY_MUTATION,
        variables: {
          subCategoryName: value.value,
          userId: 1,
          categoryId: parseInt(this.state.multiValue[0].value),
        },
      })
      .then(resp => {
        let subcategoryValue = [];
        let subCategoryValueObj = {};
        (subCategoryValueObj.label =
          resp.data.manageSubCategory.subCategory.subCategoryName),
          (subCategoryValueObj.value =
            resp.data.manageSubCategory.subCategory.id),
          subCategorys.push(subCategoryValueObj);
        subcategoryValue.push(subCategoryValueObj);
        this.setState({
          multiValuesub: subcategoryValue,
          subCategory: subCategorys,
        });
      });
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
          className={'data-table-coloumn__' + col.field}
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
        {this.state.expenses.length > 0 && (
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
        )}
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
                      onNewOptionClick={this.handleOnClickCategory.bind(this)}
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
                      onNewOptionClick={this.handleOnClickSubCategory.bind(
                        this
                      )}
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
