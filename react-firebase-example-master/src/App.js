import React, { Component } from 'react';
import logo from './logo.svg';
import firebase from './Firebase.js';
import './App.css';

class App extends Component {
  constructor() {
    console.log('constructor() Called');
    super();
    this.state = {
      stores: []
    }
  }
  componentDidMount() {
    console.log('componentDidMount() called');
    const storesReference = firebase.database().ref('stores');
    storesReference.on('value', (snapshot) => {
      let stores = snapshot.val();
      console.log('stores from Firebase: ', stores);
      let newState = [];
      for (let store in stores) {
        newState.push({
          name: stores[store].name,
          image: stores[store].image,
          rating: stores[store].rating,
          priceRange: stores[store].priceRange,
          address1: stores[store].address1,
          address2: stores[store].address2,
          city: stores[store].city,
          state: stores[store].state,
          zipCode: stores[store].zipCode,
        })
      }
      this.setState({
        stores: newState
      })
    });
  }
  render() {
    console.log('render() called');
    let storesList = this.state.stores.map((store) => {
      console.log(store)
      return (
        <h1 key={store.name}>{store.name}</h1>,
        <h4 key={store.rating}>{store.rating}</h4>,
        <h4 key={store.priceRange}>{store.priceRange}</h4>,
        <p>{store.address1} {store.address2}<br />{store.city} {store.state} {store.zipCode}</p>
      )
    });
    console.log('Current App State:', this.state);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <h4 className="App-intro">List of Stores</h4>
           <div>{storesList}</div>
      </div>
    );
  }
}

export default App;
