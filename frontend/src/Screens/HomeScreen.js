import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Review from '../components/Rating'
import Rating from '../components/Rating';


function HomeScreen(props) {

  const [searchKey,setSearchKey] = useState('');
  const [sortOrder,setSortOrder] = useState('');
  const category = props.match.params.id?props.match.params.id:"";
  const productList = useSelector(state=>state.productList);
  const { products,loading,error } = productList;
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(listProducts(category));
  },[category])


  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(listProducts(category,searchKey,sortOrder))
  }

  const sortHandler=(e)=>{
    setSortOrder(e.target.value);
    dispatch(listProducts(category,searchKey,sortOrder))
  }

  return<>
{category && <h2>{category}</h2>}
<ul className="filter">
  <li>
    <form onSubmit={handleSubmit}>
    <input name="searchKey" onChange={e=>setSearchKey(e.target.value)} />  
    <button type="submit">Search</button>
    </form>
  </li>

  <li>
    Sort By {" "}
    <select name="sortOrder" onChange={sortHandler}>
      <option value="">
        Newest

      </option>
      <option value="lowest">
        Lowest

      </option>
      <option value="highest">
        Highest

      </option>
    </select>
  </li>

</ul>
 {loading?<div className="text-center">Loading....</div>:
error?<div>{error}</div>:
  <ul className="products">
    {
      products.map(product =>
        <li key={product._id}>
          <div className="product">
            <Link to={'/product/' + product._id}>
              <img className="product-image" src={product.image} alt="product" />

            </Link>
            <div className="product-name">
              <Link to={'/product/' + product._id}>{product.name}</Link>
            </div>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">INR{product.price}</div>
            <div className="product-rating">
              <Rating value={product.rating} text={product.numReviews+ ' reviews'} />
            </div>
          </div>
        </li>)
    }


 
  </ul>
}
  </>
}
export default HomeScreen;