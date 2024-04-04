import Products from "./products";
import Cart from "./cart";
import React, { Component } from 'react';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    };
  }

  render() {
    const { cartItems } = this.state;
    return (
      <div>
        <div className="navbar-container">
          Number of items in cart: {cartItems.length}
          <button></button>
          </div>
        <div><Products/></div>
        <div><Cart/></div>
        
      </div>
    );
  }
}
