import React, { Component } from 'react';
import  { BrowserRouter, Route } from 'react-router-dom';
import Search from './components/Search/Search';
import Grid from './components/Grid/Grid';
import FullProduct from './components/FullProduct/FullProduct';
import './App.scss';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <Route path="/" component={Search} />
            <Route path="/items" exact component={Grid} />
            <Route path="/items/:id" component={FullProduct} />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
