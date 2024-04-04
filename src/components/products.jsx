import React, { Component } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { products_data as products } from '../data/products';

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [], // Array to store product IDs in the cart
    };
  }

  addToCart = (productId) => {
    this.setState((prevState) => ({
      cart: [...prevState.cart, productId],
    }), () => {
      localStorage.setItem('cartItems', JSON.stringify(this.state.cart));
      console.log(productId)
    });
  };
  
  render() {
    return (
      <div>
        <h1>Products</h1>
        <div className="product-container">
          {products.map((product) => (
            <div key={product.id} className="product-card">
               <h2>{product.title}</h2>
               <p>Php {product.price}</p>
              <img src={product.image} alt={product.title} />
              <p>{product.description}</p>
              <p>Ratings: {product.rating.rate}/5</p>
              <button onClick={() => this.addToCart(product.id)} className="add-to-cart-link">
                <FaShoppingCart /> Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
