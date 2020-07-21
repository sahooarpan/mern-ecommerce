import { PRODUCT_LIST_FAIL,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_REQUEST , PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DELETE_FAIL,PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCCESS,PRODUCT_SAVE_FAIL,PRODUCT_SAVE_REQUEST,PRODUCT_SAVE_SUCCESS
} from '../actions/types';
import axios from 'axios';
import Axios from 'axios';

export const listProducts =(category='',searchKey='',sortOrder='')=>async (dispatch)=>{
    try {
        dispatch({type:PRODUCT_LIST_REQUEST});
        const {data} = await axios.get('/api/products?category='+category+'&searchKeyword='+searchKey+'&sortOrder='+sortOrder);
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})

        
    } catch (error) {
        dispatch({type:PRODUCT_LIST_FAIL})
        
    }

}

export const saveProduct =(product)=>async(dispatch,getState)=>{
    try {
        dispatch({type:PRODUCT_SAVE_REQUEST,payload:product});
        const {userSignIn:{userInfo}}=getState();
        if(!product._id){
            const { data } = await Axios.post('/api/products',product,{
                headers:{
                    Authorization:'Bearer ' + userInfo.token
                }
            })
            dispatch({type:PRODUCT_SAVE_SUCCESS,payload:data});

        }else{
            const { data } = await Axios.put('/api/products/'+product._id,product,{
                headers:{
                    Authorization:'Bearer ' + userInfo.token
            }
            })
            dispatch({type:PRODUCT_SAVE_SUCCESS,payload:data});
        }
    }
        
     catch (error) {
        dispatch({type:PRODUCT_SAVE_FAIL,payload:error.message})
    }
}

export const deleteProdcut = (productId) => async (dispatch, getState) => {
    try {
      const { userSignIn: { userInfo } } = getState();
      dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
      const { data } = await axios.delete("/api/products/" + productId, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token
        }
      });
      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  
    }
  }
 

export const detailsProducts =(productId)=>async (dispatch)=>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST,payload:productId});
        const {data} = await axios.get('/api/products/'+productId);
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data})

        
    } catch (error) {
        dispatch({type:PRODUCT_DETAILS_FAIL})
        
    }

}