import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions'
import CheckOutSteps from '../components/CheckOutSteps'
function ShippingScreen(props) {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setpostalCode] = useState('');
  const [country, setCountry] = useState('');
  
  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();
    console.log(postalCode,country)
    dispatch(saveShipping({address,city,postalCode,country}));
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
          <label htmlFor="postalCode">postalCode</label>
          <input type="text" id="postalCode" name="postalCode" onChange={(e) => setpostalCode(e.target.value)}>
          </input>
        </li>
        <li>
        <label htmlFor="country">
              Country
          </label>
            <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
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