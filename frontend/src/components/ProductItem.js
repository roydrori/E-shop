import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../store';

const ProductItem = ({ product }) => {


  const { state, dispatch: cxtDispatch } = useContext(Store)

  const navigate = useNavigate();

  const {
    cart: { cartItems }
  } = state

  const addToCartHandler = async () => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/v1/products/${product._id}`)


    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock')
      return;
    }
    cxtDispatch({type : "ADD_TO_CART",  payload: { ...product, quantity}})
    navigate('/cart')
  }


  return (
    <Card className="product-card">
      <Link to={`product/${product.token}`}>
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.token}`}>
          <Card.Title>{product.title}</Card.Title>
        </Link>
        <Rating rating={product.rating} />
        <Card.Text>{product.price}$</Card.Text>     
        {
          product.countInStock === 0? <Button variant='light' disabled>Out Of Stock</Button>:
          <Button className='btn-primary' onClick={() => addToCartHandler(product)}>Add to cart</Button>
        }
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
