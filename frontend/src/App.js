import React from 'react';
import RegisterScreen from './Screens/RegisterScreen'
import SignInScreen from './Screens/SignInScreen'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen'
import { userSignInReducer } from './reducers/userReducers';
import SignIn from './Screens/SignInScreen';
import ProductsScreen from './Screens/ProductsScreen'
import ShippingScreen from './Screens/ShippingScreen'
import PaymentScreen from './Screens/PaymentScreen'
import PlaceOrder from './Screens/PlaceOrder'
import OrderScreen from './Screens/OrderScreen'
import ProfileScreen from './Screens/ProfileScreen'
import OrdersScreen from './Screens/OrdersScreen'

function App() {

  const userSignIn = useSelector(state=>state.userSignIn);
  const {userInfo} = userSignIn;


  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              &#9776;
        </button>
            <Link to="/" >amazona</Link>
          </div>
          <div className="header-links">
            <Link to="/cart/:id">Cart</Link>
            {
              userInfo?<Link to="/profile">
                {userInfo.name}
              </Link>:  <Link to="/signin">Sign In</Link>
          
            }

            {
              userInfo && userInfo.isAdmin && <div className="dropdown">
                <a href="#">
                Admin
                </a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders" >Orders</Link>
                    
                  </li>
                  {" "}
                <li>
                <Link to="/products" >Products</Link>
                </li>
                </ul>

              </div>
            }
          
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul className="categories">
            <li>
              <Link to="/category/Mens">Mens</Link>
            </li>
            <li>
            <Link to="/category/Womens">Womens</Link>
            </li>
            <li>
            <Link to="/category/Cricket">Cricket</Link>
            </li>

          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
              
            <Route path="/signin" component={SignInScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            
            <Route path="/register" component={RegisterScreen} />
            
            <Route path="/products" component={ProductsScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrder} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path='/orders' component={OrdersScreen} />
            
            <Route path="/order/:id" component={OrderScreen} />

            <Route path="/" exact={true} component={HomeScreen} />



          </div>

        </main>
        <footer className="footer">
          All right reserved.
    </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
