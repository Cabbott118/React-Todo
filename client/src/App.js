import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import SearchTodos from './components/todos/SearchTodos';
import AddTodo from './components/todos/AddTodo';
import Todos from './components/todos/Todos';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    todos: [],
    searchedTodos: [],
  };

  componentDidMount() {
    axios.get('/api/todos').then((res) => this.setState({ todos: res.data }));
  }

  toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo._id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  addTodo = (title) => {
    axios
      .post('/api/todos', {
        title: title,
        completed: false,
      })
      .then((res) => this.setState({ todos: [...this.state.todos, res.data] }));
  };

  deleteTodo = (id) => {
    axios.delete(`/api/todos/${id}`).then((res) =>
      this.setState({
        todos: [...this.state.todos.filter((todo) => todo._id !== id)],
        searchedTodos: [
          ...this.state.searchedTodos.filter((todo) => todo._id !== id),
        ],
      })
    );
  };

  searchTodo = (searchParam) => {
    axios.get('/api/todos').then((res) =>
      this.setState({
        searchedTodos: [
          ...this.state.todos.filter((todo) => todo.title === searchParam),
        ],
      })
    );

    if (this.state.searchedTodos.length === 0) {
      console.log('empty');
    }
  };

  render() {
    return (
      <Router>
        <div className='App'>
          <Header />
          <Route
            exact
            path='/'
            render={(props) => (
              <React.Fragment>
                <div className='container'>
                  <div className='todoBlock'>
                    <SearchTodos searchTodos={this.searchTodo} />
                    <Todos
                      key={this.state.searchedTodos._id}
                      todos={this.state.searchedTodos}
                      toggleComplete={this.toggleComplete}
                      deleteTodo={this.deleteTodo}
                    />
                  </div>
                  <div className='todoBlock'>
                    <AddTodo addTodo={this.addTodo} />
                    <Todos
                      key={this.state.todos._id}
                      todos={this.state.todos}
                      toggleComplete={this.toggleComplete}
                      deleteTodo={this.deleteTodo}
                    />
                  </div>
                </div>
              </React.Fragment>
            )}
          />
          <Route path='/about' component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
