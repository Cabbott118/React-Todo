import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddTodo extends Component {
  state = {
    title: '',
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const todoLowercase = this.state.title.toLowerCase();
    this.props.addTodo(todoLowercase);
    this.setState({ title: '' });
  };

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        style={{ display: 'flex', height: '45px' }}
      >
        <input
          type='text'
          name='title'
          required
          style={{ flex: '10', padding: '5px', fontSize: '1rem' }}
          placeholder='Add Todo...'
          value={this.state.title}
          onChange={this.onChange}
        />
        <input
          type='submit'
          value='Submit'
          className='btn'
          style={{ flex: '1', fontSize: '1rem' }}
        />
      </form>
    );
  }
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default AddTodo;
