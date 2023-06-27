import { useContext, useEffect, useReducer } from "react";
import { Loading, MessageBox, Store, axios, useNavigate, useParams,Col, Row, Card, ListGroup, Link, getError } from "../Imports";

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'GET_REQUEST': {
            return { ...state, loading: true, error: '' , order: []}
        }
        case 'GET_SUCCESS': {
            return { ...state, loading: false, error: '', order: payload }
        }
        case 'GET_FAIL': {
            return { ...state, loading: false, error: payload }
        }
        default:
            return state;
    }
}

function OrderPage() {
    const navigate = useNavigate()
    const params = useParams()

    const {
        state: { userInfo }
    } = useContext(Store)
    

    const { orderId } = params
    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        order: null,
        error: ''
    })

    useEffect(() => {
        console.log("id: " ,orderId)
        
        const getOrder = async () => {
            try {
                console.log("here")
                dispatch({ type: 'GET_REQUEST' })

                const { data } = await axios.get(`/api/v1/orders/${orderId}`, {
                    headers: { authorization: `bearer ${userInfo.token}` }
                })

                console.log(data)
                dispatch({ type: 'GET_SUCCESS', payload: data })
            } catch (err) {
                console.log(err);
                dispatch({ type: 'GET_FAIL', payload: getError(err) })
            }
        }

        if (!userInfo) {
            navigate('/login')  
        }

        if (order === null || (order._id && orderId !== order._id)) {
            getOrder()
        }
    }, [navigate, order, orderId, userInfo])

    return loading ? (
        <Loading />
    ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
    ) : (
        <div>
            <title>Order</title>
            <h1 className='my-3'>Order</h1>
            <Row>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                <strong>Address: </strong> {order.shippingAddress.address},
                                {order.shippingAddress.city},{order.shippingAddress.country}
                            </Card.Text>

                            {order.isDelivered ? (
                                <MessageBox variant='success'>
                                    Delivered at {order.deliveredAt}
                                </MessageBox>
                            ) : (
                                <MessageBox variant='danger'>Not Delivered</MessageBox>
                            )}
                        </Card.Body>
                    </Card>

                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method:</strong> {order.paymentMethod}
                            </Card.Text>
                            {order.isPaid ? (
                                <MessageBox variant='success'>
                                    Paid at {order.paidAt}
                                </MessageBox>
                            ) : (
                                <MessageBox variant='danger'>Not Paid</MessageBox>
                            )}
                        </Card.Body>
                    </Card>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>Items</Card.Title>
                            <ListGroup variant='flush'>
                                {order.orderItems.map(item => (
                                    <ListGroup.Item key={item._id}>
                                        <Row className='align-items-center'>
                                            <Col md={6}>
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className='img-fluid rounded img-thumbnail'
                                                ></img>{' '}
                                                <Link to={`/product/${item.token}`}>{item.title}</Link>
                                            </Col>
                                            <Col md={3}>
                                                <span>{item.quantity}</span>
                                            </Col>
                                            <Col md={3}>${item.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>


                <Col md={4}>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${order.itemsPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong> Order Total</strong>
                                        </Col>
                                        <Col>
                                            <strong>${order.totalPrice.toFixed(2)}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
export default OrderPage;