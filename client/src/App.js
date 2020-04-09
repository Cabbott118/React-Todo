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
      .then(
        (res) =>
          console.log('TODO Added:', res.data.title) +
          this.setState({ todos: [...this.state.todos, res.data] })
      );
  };

  deleteTodo = (id) => {
    axios.delete(`/api/todos/${id}`).then((res) =>
      this.setState({
        todos: [...this.state.todos.filter((todo) => todo._id !== id)],
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
  };

  render() {
    console.log(this.state.searchedTodos);
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
                  <SearchTodos searchTodos={this.searchTodo} />
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    key={this.state.todos._id}
                    todos={this.state.todos}
                    toggleComplete={this.toggleComplete}
                    deleteTodo={this.deleteTodo}
                  />
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
