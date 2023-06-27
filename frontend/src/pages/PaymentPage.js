import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import { CheckoutSteps } from "../Imports";
import { Store } from "../Imports";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";


function PaymentPage() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { shippingAdress, paymentMethod } } = state;

    const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'stripe');

    useEffect(() => {
        if (!shippingAdress) {
            navigate('/shipping')
        }
        else if (!shippingAdress.address) {
            navigate('/shipping')
        }
    }, [navigate, shippingAdress])


    const submitHandler = (e) => {
        e.preventDefault();

        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName })
        localStorage.setItem('paymentMethod', paymentMethod)
        navigate('/placeorder');
    }

    return (
        <div>
            <title title='Payment' />
            <CheckoutSteps step1 step2 step3 />
            <div className="container small-container">
                <h1 className="my-3">Shipping Address</h1>
                <Form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <Form.Check type='radio' id='stripe' label='stripe' value='stripe' checked={paymentMethodName === 'stripe'}
                            onChange={(e) => setPaymentMethodName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <Form.Check type='radio' id='PayPal' label='PayPal' value='PayPal' checked={paymentMethodName === 'PayPal'}
                            onChange={(e) => setPaymentMethodName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <Button type="submit">Continue</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}
export default PaymentPage;