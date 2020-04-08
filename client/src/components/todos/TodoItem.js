import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
  getStyle = () => {
    return {
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      borderLeft: '1px #ccc dotted',
      borderRight: '1px #ccc dotted',
      backgroundColor: '#fff',
      textDecoration: this.props.todo.completed ? 'line-through' : 'none',
    };
  };

  render() {
    const { _id, title } = this.props.todo;

    return (
      <div style={this.getStyle()}>
        <p>
          <input
            style={chkStyle}
            type='checkbox'
            onChange={this.props.toggleComplete.bind(this, _id)}
          />{' '}
          {title}
          <button
            onClick={this.props.deleteTodo.bind(this, _id)}
            style={btnStyle}
          >
            x
          </button>
        </p>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

const chkStyle = {
  cursor: 'pointer',
};

const btnStyle = {
  backgroundColor: '#ff0000',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right',
};

export default TodoItem;
