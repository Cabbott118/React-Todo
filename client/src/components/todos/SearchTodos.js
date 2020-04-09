import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SearchTodos extends Component {
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
    this.props.searchTodos(todoLowercase);
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
          style={{ flex: '10', padding: '5px', fontSize: '1rem' }}
          placeholder='Search Todos...'
          value={this.state.title}
          onChange={this.onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn'
          style={{ flex: '1', fontSize: '1rem' }}
        />
      </form>
    );
  }
}

SearchTodos.propTypes = {
  searchTodos: PropTypes.func,
};

export default SearchTodos;
