import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Container from 'react-bootstrap/Container';
import CartPage from './pages/CartPage';
import CustomNavBar from './components/CustomNavBar';
import SigninPage from './pages/SigninPage';
import { ToastContainer } from 'react-toastify';
import ShippingAddressPage from './pages/ShippingAddressPage';
import 'react-toastify/dist/ReactToastify.css';
import SignupPage from './pages/signupPage';
import { PaymentPage } from './Imports';
import SubmitOrderPage from './pages/SubmitOrder';
import OrderPage from './pages/OrderPage';
import SearchPage from './pages/SearchPage';
import HistoryOrderPage from './pages/OrderHistoryPage';
import ProfilePage from './pages/ProfilePage';




function App() {
 

  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allpage">
        <ToastContainer position='bottom-center' limit={1}/>
        <header>
          <CustomNavBar></CustomNavBar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:token" element={<ProductPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path='/signin' element={<SigninPage/>}/>
              <Route path='signup' element={<SignupPage/>}/>
              <Route path='/shipping' element={<ShippingAddressPage/>}/>
              <Route path='/payment' element={<PaymentPage/>}/>
              <Route path='/placeorder' element={<SubmitOrderPage/>}/>
              <Route path='/orders/:orderId' element={<OrderPage/>}/>
              <Route path="/orderhistory" element={<HistoryOrderPage/>} />
              <Route path='/search' element={<SearchPage/>}/>
              <Route path='/profile' element={<ProfilePage/>}/>
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
