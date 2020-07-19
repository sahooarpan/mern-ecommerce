import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions'
import CheckOutSteps from '../components/CheckOutSteps'
function ShippingScreen(props) {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalcode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  
  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({address,city,postalcode,city}));
    props.history.push("payment");
  }
  return <div>
      <CheckOutSteps step1 step2/>
  <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Shipping</h2>
        </li>
        
        <li>
          <label htmlFor="address">
            address
          </label>
          <input type="text" address="address" id="address" onChange={(e) => setAddress(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="city">
            city
          </label>
          <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="postalcode">postalcode</label>
          <input type="text" id="postalcode" name="postalcode" onChange={(e) => setPostalCode(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="country">Country</label>
          <input type="text" id="country" name="country" onChange={(e) => setCountry(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Continue</button>
        </li>
        

      </ul>
    </form>
  </div>
  </div>
}
export default ShippingScreen; 