import React, { Component } from "react";
import PropTypes from "prop-types";
import * as RecordsAPI from "../api/index";
import { parseCtime } from "../filter";

export default class Record extends Component {
  constructor() {
    super();
    this.state = {
      edit: false
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log("Record's componentWillReceiveProps", nextProps);
  }
  handleEdit(event) {
    event.preventDefault();
    const record = {
      date: this.refs.date.value,
      title: this.refs.title.value,
      amount: Number.parseInt(this.refs.amount.value, 0)
    };
    RecordsAPI.update(this.props.record.id, record)
      .then(response => {
        this.props.handleEditRecord(this.props.record, response.data);
      })
      .catch(error => console.log(error.message));
  }

  handleDelete(event) {
    event.preventDefault();
    RecordsAPI.remove(this.props.record.id)
      .then(response => {
        this.props.handleDeleteRecord(this.props.record);
      })
      .catch(error => console.log(error.message));
  }

  handleToggle() {
    this.setState({
      edit: !this.state.edit
    });
  }
  recordRow() {
    return (
      <tr>
        <td>{parseCtime(this.props.record.date)}</td>
        <td>{this.props.record.title}</td>
        <td>{this.props.record.amount}</td>
        <td>
          <button
            className="btn btn-info mr-1"
            onClick={this.handleToggle.bind(this)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={this.handleDelete.bind(this)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
  recordForm() {
    return (
      <tr>
        <td>
          <input
            type="text"
            name="date"
            defaultValue={this.props.record.date}
            ref="date"
          />
        </td>
        <td>
          <input
            type="text"
            name="title"
            defaultValue={this.props.record.title}
            ref="title"
          />
        </td>
        <td>
          <input
            type="text"
            name="amount"
            defaultValue={this.props.record.amount}
            ref="amount"
          />
        </td>
        <td>
          <button
            className="btn btn-info mr-1"
            onClick={this.handleEdit.bind(this)}
          >
            Update
          </button>
          <button
            className="btn btn-danger"
            onClick={this.handleToggle.bind(this)}
          >
            Cancel
          </button>
        </td>
      </tr>
    );
  }
  render() {
    if (this.state.edit) {
      return this.recordForm();
    } else {
      return this.recordRow();
    }
  }
}

Record.propTypes = {
  record: PropTypes.object
};
