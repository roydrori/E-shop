// * React
import React from 'react'
import axios from 'axios'
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import {
  useEffect,
  useReducer,
  useContext,
  useState,
  createContext,
  useRef
} from 'react'

// * React-Bootstrap

import NavDropdown from 'react-bootstrap/NavDropdown'
import { LinkContainer } from 'react-router-bootstrap'
import { ListGroupItem, Nav } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Navbar from 'react-bootstrap/Navbar'
import Rating from './components/Rating'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import { Helmet } from 'react-helmet-async'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

// * Components
import Loading from './components/Loading'
import MessageBox from './components/MessageBox'
import Product from './components/ProductItem'
import NavBar from './components/CustomNavBar'
import CheckoutSteps from './components/CheckoutSteps'

// * Other
import { getError } from './utils'
import { Store } from './store'

// import { UploadingReducer, CartReducer, LocationReducer } from './reducers'
import { toast ,ToastContainer} from 'react-toastify'


// * Pages
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import SigninPage from './pages/SigninPage'
import ShippingAddressPage from './pages/ShippingAddressPage'
// import SignupPage from './pages/SignupPage'
import PaymentPage from './pages/PaymentPage';

export {
  PaymentPage,
//   SignupPage,
  CheckoutSteps,
  ShippingAddressPage,
  ToastContainer,
//   addToCartHandler,
  toast,
  NavDropdown,
  useRef,
  React,
  Link,
  axios,
  useLocation,
  useNavigate,
  useParams,
  BrowserRouter,
  Route,
  Routes,
  useEffect,
  useReducer,
  useContext,
  useState,
  Spinner,
  Alert,
  createContext,
  LinkContainer,
  ListGroupItem,
  Nav,
  Container,
  Row,
  Col,
  ListGroup,
  Navbar,
  Rating,
  Card,
  Button,
  Badge,
  Helmet,
  Loading,
  MessageBox,
  Product,
  NavBar,
  getError,
  Store,
//   UploadingReducer,
//   CartReducer,
//   LocationReducer,
  HomePage,
  ProductPage,
  CartPage,
  SigninPage,
  Form
}