import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../store';
import { USER_SIGNOUT } from '../action';

function CustomNavBar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { state } = useContext(Store);
  const { cart } = state;
  const { userInfo } = state;
  const navigate = useNavigate();
  const location = useLocation();


  const SignOutHandler = () => {
    ctxDispatch({ type: USER_SIGNOUT });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
  }

  return (
    <NavBar bg="dark" variant="dark">
      <Link className='ms-3' onClick={() => navigate(-1)}>
        {location.pathname !== '/' && <i className='fa fa-arrow-left text-white align-arrow-right'></i>}
      </Link>
      <Container>
        <LinkContainer to="/">
          <NavBar.Brand>EShop</NavBar.Brand>
        </LinkContainer>
        {
          location.pathname !== "/" ?
            <LinkContainer to='/'>
              <NavBar.Brand>Home</NavBar.Brand>
            </LinkContainer> : null
        }

        <Nav className="ms-auto w-50 d-flex justify-content-end">
          <Link to="/cart" className="nav-link">
            <i className="fas fa-shopping-cart"> </i>
            {cart.cartItems.length > 0 && (
              <Badge pill bg="danger">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
            )}
          </Link>
          {
            userInfo ? (
              <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    User Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/orderhistory'>
                  <NavDropdown.Item>
                    Order History
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <Link className='dropdown-item' to='#signout' onClick={SignOutHandler}>Sign Out</Link>
              </NavDropdown>
            ) : (
              <Link className='nav-link' to='/signin'>Sign In</Link>
            )
          }
        </Nav>
        {/* <Nav>
                <Link to="/signin" className='nav-link'>SignIn
                </Link>
              </Nav> */}
      </Container>
    </NavBar>
  );
}
export default CustomNavBar;