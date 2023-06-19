  import React, { useContext } from 'react'
  import { Store } from '../store'
  import { Helmet } from 'react-helmet-async'
  import MessageBox from '../components/MessageBox'
  import { Card, Col, ListGroup, Row } from 'react-bootstrap'
  import Button from 'react-bootstrap/Button'
  import { Link, useNavigate } from 'react-router-dom'
  import axios from 'axios'
  import './CartPage'
  import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';


  function CartPage () {

    
    const { state, dispatch: ctxDispatch } = useContext(Store)
    
    const navigate = useNavigate();
    
    const {
      cart: { cartItems }
    } = state

    const updateCartHandler = async (item, quantity) => {
      const { data } = await axios.get(`/api/v1/products/${item._id}`)
      if (data.countInStock < quantity) {
        window.alert('Sorry. Product is out of stock')
        return
      }
      ctxDispatch({type : "ADD_TO_CART",  payload: { ...item,  quantity }})
    }

    const removeCartHandler = async (item) => {
      // const { data } = await axios.get(`/api/v1/product/${item._id}`)

      ctxDispatch({type : "REMOVE_FROM_CART",  payload: item})
    }


    const checkoutHandler = async() => {
      navigate("/signin?redirect=/shipping");
    }

    const DragEndHandle = (result) => {
      ctxDispatch({type: "REORDER_CART_ITEMS", payload: result});
    };

    return (
      <div>
        <Helmet>
          <title>Shopping Curt</title>
        </Helmet>
        <h1>Shopping Cart</h1>
        <Row>
          <Col md={8}>
            {cartItems.length === 0 ? (
              <MessageBox>
                Cart is empty.
                <Link to='/'> To Home</Link>
              </MessageBox>
            ) : (
              <DragDropContext onDragEnd={DragEndHandle}>
              <Droppable droppableId='list'>
              { (provided) => 
                <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                  {cartItems.map((item, index) => (
                    <Draggable key={item._id} draggableId={item._id.toString()} index={index}>
                    {(provided)=>{
                      return(
                      <ListGroup.Item key={item._id}  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Row className='align-items-center'>
                          <Col md={4}>
                            <img
                              src={item.image}
                              alt={item.title}
                              className='img-fluid rounded img-thumbnail'
                            ></img>{' '}
                            <Link
                              to={`/products/${item.token}`}
                              className='image-tumbnail'
                            >
                              {item.title}
                            </Link>
                          </Col>
                          <Col md={3}>
                            {/* ------ */}
                            <Button
                              variant='light'
                              disabled={item.quantity === 1}
                              onClick={() =>
                                updateCartHandler(item, item.quantity - 1)
                              }
                            >
                              <i className='fas fa-minus-circle'></i>
                            </Button>
                            <span>{item.quantity}</span>
                            {/* +++++ */}
                            <Button
                              variant='light'
                              disabled={item.quantity === item.countInStock}
                              onClick={() =>
                                updateCartHandler(item, item.quantity + 1)
                              }
                            >
                              <i className='fas fa-plus-circle'></i>
                            </Button>
                          </Col>
                          <Col md={3}>{item.price}</Col>
                          <Col md={2}>
                            <Button variant='light' onClick={ () => removeCartHandler(item)} >
                              <i className='fas fa-trash'></i>
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      )
                    }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ListGroup>
              }
              </Droppable>
              </DragDropContext>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                      items:) : ${' '}
                      {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                    </h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button
                        type='button'
                        variant='primary'
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                      >
                        Checkout
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

  export default CartPage