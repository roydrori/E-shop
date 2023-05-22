import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Container from 'react-bootstrap/Container';
import CartPage from './pages/CartPage';
import CustomNavBar from './components/CustomNavBar';
import SigninPage from './pages/SigninPage';

function App() {
 

  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allpage">
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
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All Rights Reserved</div>
        </footer>
        {/* {<Footer />} */}
      </div>
    </BrowserRouter>
  );
}

export default App;
