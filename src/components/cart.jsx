import React, { Component } from 'react';
import { products_data as products } from '../data/products';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    };
  }

  removeFromCart = (productId) => {
    const updatedCartItems = this.state.cartItems.filter(item => item !== productId);
    this.setState({ cartItems: updatedCartItems }, () => {
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Update localStorage
    });
  };

  increaseQuantity = (productId) => {
    const updatedCartItems = [...this.state.cartItems];
    const index = updatedCartItems.indexOf(productId);
    if (index !== -1) {
      updatedCartItems.push(productId); // Add the same productId to increase quantity
      this.setState({ cartItems: updatedCartItems }, () => {
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      });
    }
    console.log(updatedCartItems)
  };
  
  decreaseQuantity = (productId) => {
    const updatedCartItems = [...this.state.cartItems];
    const index = updatedCartItems.indexOf(productId);
    if (index !== -1) {
      updatedCartItems.splice(index, 1); // Remove one instance of productId
      this.setState({ cartItems: updatedCartItems }, () => {
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      });
    }
  };
  render() {
    return (
      <div>
        <h1>Cart</h1>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.cartItems.map((productId) => {
              const product = products.find(item => item.id === productId);
              const subtotal = product.price * this.state.cartItems.filter(item => item === productId).length;
              return (
                <tr key={productId}>
                  <td>{product.title}</td>
                  <td>Php {product.price}</td>
                  <td>{this.state.cartItems.filter(item => item === productId).length}</td>
                  <td>Php {subtotal}</td>
                  <td>
                     <button onClick={() => this.increaseQuantity(productId)}>+</button>
                    <button onClick={() => this.decreaseQuantity(productId)}>-</button>

                    <button onClick={() => this.removeFromCart(productId)}>Remove</button>
                    
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total:</td>
              <td>Php {this.state.cartItems.reduce((total, productId) => {
                const product = products.find(item => item.id === productId);
                return total + product.price;
              }, 0)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}
