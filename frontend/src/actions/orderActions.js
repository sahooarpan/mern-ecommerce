import Axios from "axios";
import {
    ORDER_CREATE_FAIL,ORDER_CREATE_REQUEST,ORDER_DETAILS_SUCCESS,ORDER_CREATE_SUCCESS,ORDER_DETAILS_REQUEST,ORDER_DETAILS_FAIL,
    ORDER_PAY_FAIL,ORDER_PAY_REQUEST,ORDER_PAY_SUCCESS,MY_ORDER_LIST_FAIL,MY_ORDER_LIST_REQUEST,MY_ORDER_LIST_SUCCESS


} from "./orderConstants";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const { userSignIn: { userInfo } } = getState();
    console.log(userInfo);
    console.log(order)
    const { data } = await Axios.post("/api/orders", order, {
      headers: {
        Authorization: ' Bearer ' + userInfo.token
      }
    });

    console.log(data,"norder")
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
      console.log(error.message)
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
}

const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { userSignIn: { userInfo } } = getState();
    console.log(userInfo)
    const { data } = await Axios.get("/api/orders/" + orderId, {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    console.log("Order Data",data)
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
}

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
      const { userSignIn: { userInfo } } = getState();
      const { data } = await Axios.put("/api/orders/" + order._id + "/pay", paymentResult, {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
    }
  }
  const listMyOrders = () => async (dispatch, getState) => {
    try {
      dispatch({ type: MY_ORDER_LIST_REQUEST });
      const { userSignIn: { userInfo } } = getState();
      const { data } = await Axios.get("/api/orders/mine", {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
    }
  }
  
  

  export { createOrder, detailsOrder, payOrder,listMyOrders }; 


