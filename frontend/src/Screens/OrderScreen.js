import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { craeteOrder,detailsOrder } from '../actions/orderActions'
import { orderDetailsReducer } from '../reducers/orderReducers';

function OrderScreen(props) {
    const dispatch = useDispatch();

useEffect(()=>{

    dispatch(detailsOrder(props.match.params.id))    

},[])
  
const orderDetails = useSelector(state=>state.orderDetails);

const {loading,order,error}=orderDetails;

const payHandler = () => {
    // create an order
    console.log(orderDetails);
  }
  useEffect(() => {

  }, []);

 
  return loading?<div>Loading...</div>:error?<div>Error</div>:
  <div>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Shipping
          </h3>
          <div>
            {order && order.shipping &&  order.shipping.address}, {order && order.shipping && order.shipping.city},
          {order && order.shipping && order.shipping.postalCode}, {order && order.shipping && order.shipping.country},
          </div>
          <div>
              {order.isDelivered?"Delivered At"+order.deliveredAt:"Not Delivered" }
          </div>
        </div>
        <div>
          <h3>Payment</h3>
          <div>
            Payment Method: {order && order.payment &&order.payment.paymentMethod}
          </div>
          <div>
              {order.isPaid?"Paid at"+orderDetailsReducer.paidAt:"Not Paid."}
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                Shopping Cart
          </h3>
              <div>
                Price
          </div>
            </li>
            {
              order.orderItems.length === 0 ?
                <div>
                  Cart is empty
          </div>
                :
                order.orderItems.map(item =>
                  <li>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>

                      </div>
                      <div>
                        Qty: {item.qty}
                      </div>
                    </div>
                    <div className="cart-price">
                      INR:{item.price}
                    </div>
                  </li>
                )
            }
          </ul>
        </div>


      </div>
      <div className="placeorder-action">
        <ul>
          <li>
            <button className="button primary full-width" onClick={payHandler} >Place Order</button>
          </li>
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <div>Items</div>
            <div>INR:{order.itemsPrice}</div>
          </li>
          <li>
            <div>Shipping</div>
            <div>INR:{order.shippingPrice}</div>
          </li>
          <li>
            <div>Tax</div>
            <div>INR:{order.taxPrice}</div>
          </li>
          <li>
            <div>Order Total</div>
            <div>INR:{order.totalPrice}</div>
          </li>
        </ul>



      </div>

    </div>
  </div>

}

export default OrderScreen; 