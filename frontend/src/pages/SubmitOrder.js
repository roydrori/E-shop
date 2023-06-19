import { Button, Card, CheckoutSteps, Col, Link, ListGroup, Loading, Row, axios, getError, toast } from "../Imports";
import { Store } from "../Imports";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "../Imports";
import { Toast } from "react-bootstrap";


const reducer = (state, { type, payload }) => {
    switch (type) {
        case "CREATE_REQUEST": {
            return { ...state, loading: true }
        }
        case "CREATE_SUCCESS": {
            return { ...state, loading: false }
        }
        case 'CREATED_FAILED': {
            return {...state, loading: false}
        }
        default:
            return state;
    }
}


function SubmitOrderPage() {

    const [{ loading}, dispatch] = useReducer(reducer, { loading: false})


    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const navigate = useNavigate();


    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100

    cart.itemsPrice = round2(cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0));
    cart.taxPrice = round2(cart.itemsPrice * 0.17);
    cart.shippingPrice = cart.itemsPrice > 50 ? round2(cart.itemsPrice * 0.1) : round2(cart.cartItems * 0.02)
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;


    const submitOrderHandle =  async() => {
        try{
            dispatch({type: 'CREATE_REQUEST'});
            const {data} = await axios.post('/api/v1/orders', {
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPricem,
                taxPrice: cart.taxPrice,
                totalPrice : cart.totalPrice
            },{
                headers: {authorization: `Bearer ${userInfo.token}`}
            })
            dispatch({type: "CREATE_SUCCESS"});

            ctxDispatch({type: 'CLEAR_CART'});
            localStorage.removeItem('cartItems');
            
            navigate(`/order/${data.order._id}`);
        }
        catch(err){
            dispatch({type: 'CREATED_FAILED'});
            toast.error(getError(err));
        }
    }


    useEffect(() => {
        if (!cart) {
            navigate('/payment')
        }
        else if (!cart.paymentMethod) {
            navigate('/payment')
        }
    }, [])


    return (
        <div>
            <title>Orders Summary</title>
            <CheckoutSteps step1 step2 step3 step4 />
            <h1 className="my-3">Orders Summary</h1>
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name: </strong>
                                {cart.shippingAddress.name}
                                <br />
                                <strong>Address: </strong>
                                {cart.shippingAddress.address}
                                <br />
                                <strong>City: </strong>
                                {cart.shippingAddress.city}
                                <br />
                                <strong>Country: </strong>
                                {cart.shippingAddress.country}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </Card.Text>
                            <Link to='/payment'>Edit</Link>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Items</Card.Title>
                            <ListGroup variant="flush">
                                {cart.cartItems.map((item) => (
                                    <ListGroup.Item key={item._id}>
                                        <Row className="align-items-center">
                                            <Col md={6}>
                                                <img src={item.image} alt={item.title} className="img-fluid rounded img-thumbnail"></img>{' '}
                                                <Link to={`/product/${item.token}`}>{item.title}</Link>
                                            </Col>
                                            <Col md={3}>
                                                <span>{item.quantity}</span>
                                            </Col>
                                            <Col md={3}>
                                                ${item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Link to="/cart">Edit</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Summary: </Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>
                                            ${cart.itemsPrice.toFixed(2)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>
                                            ${cart.shippingPrice.toFixed(2)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>
                                            ${cart.taxPrice.toFixed(2)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>
                                            <strong>${cart.totalPrice.toFixed(2)}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button type="button" onClick={submitOrderHandle} disabled={cart.cartItems.length == 0}>Submit</Button>
                                    </div>
                                    {loading && <Loading/>}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
export default SubmitOrderPage;