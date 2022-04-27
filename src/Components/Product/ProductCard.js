// Creating component for listing to be shown on search
import React, { useEffect, useState } from "react";
// importing asset
import MobileImg from "../../assets/mobile.png";

// importing stylesheet
import "./ProductCard.css";
// importing required services
import {
  getWishlist,
  addToWishList,
  isProductInWishlist
} from '../../Services/user-services';
// importing router 
import { Link } from "react-router-dom";

const ProductCard = (props) => {

  // type of listings
  const typeDisplayValue = {
    sell : "Buy",
    swap: "Swap",
    free: "Free"
  }

  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(()=>{
    (async()=>{

      console.log(props.data)
      const response = await isProductInWishlist(props.data._id);

      if(response && response.status){
        setIsWishlisted(response.available)
      }
      console.log(response);
    })()
  },[])

  // Allows wishlisting 
  const handleAddToWishlist = async() =>{
      const response = await addToWishList(props.data._id);
      console.log(response);
      if(response && response.status){
        setIsWishlisted(response.data)
      }
  }

  // Rendering JSX
  return (

    <div className="col-md-4">
    
    <div className="card shadow-sm">

      {
        props.data.images && props.data.images[0] ? 
          <img src={props.data.images[0]} className="card-img-top" alt="Listing" />
        : <img src={MobileImg} className="card-img-top" alt="iPhone" />
      }
      <div className="card-type">{typeDisplayValue[props.data.type]}</div>
      <button className="card-wishlist" onClick={handleAddToWishlist}>

      {isWishlisted? 
        <svg width="24" height="24" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.0273 3.53908C16.7655 2.9329 16.3881 2.38359 15.916 1.92189C15.4436 1.45881 14.8866 1.09082 14.2754 0.837904C13.6416 0.57461 12.9617 0.43984 12.2754 0.44142C11.3125 0.44142 10.373 0.705092 9.55664 1.20314C9.36133 1.32228 9.17578 1.45314 9 1.59572C8.82422 1.45314 8.63867 1.32228 8.44336 1.20314C7.62695 0.705092 6.6875 0.44142 5.72461 0.44142C5.03125 0.44142 4.35937 0.574233 3.72461 0.837904C3.11133 1.09181 2.55859 1.45705 2.08398 1.92189C1.61132 2.38307 1.23375 2.93251 0.972656 3.53908C0.701172 4.16994 0.5625 4.83986 0.5625 5.52931C0.5625 6.1797 0.695313 6.85744 0.958984 7.54689C1.17969 8.12306 1.49609 8.72072 1.90039 9.32423C2.54102 10.2793 3.42187 11.2754 4.51562 12.2852C6.32812 13.959 8.12305 15.1152 8.19922 15.1621L8.66211 15.459C8.86719 15.5899 9.13086 15.5899 9.33594 15.459L9.79883 15.1621C9.875 15.1133 11.668 13.959 13.4824 12.2852C14.5762 11.2754 15.457 10.2793 16.0977 9.32423C16.502 8.72072 16.8203 8.12306 17.0391 7.54689C17.3027 6.85744 17.4355 6.1797 17.4355 5.52931C17.4375 4.83986 17.2988 4.16994 17.0273 3.53908V3.53908Z" fill="white"/>
          </svg>
          
          : 
          <svg
            width="24"
            height="24"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
          <path
            d="M5.83317 2.5C3.53234 2.5 1.6665 4.34667 1.6665 6.625C1.6665 8.46417 2.39567 12.8292 9.57317 17.2417C9.70174 17.3199 9.84934 17.3613 9.99984 17.3613C10.1503 17.3613 10.2979 17.3199 10.4265 17.2417C17.604 12.8292 18.3332 8.46417 18.3332 6.625C18.3332 4.34667 16.4673 2.5 14.1665 2.5C11.8657 2.5 9.99984 5 9.99984 5C9.99984 5 8.134 2.5 5.83317 2.5Z"
            stroke="#EEEEEE"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          </svg>
      }


        
      </button>
      <div className="card-body">
      <Link to={"/product-details/"+props.data._id} className="cardLink">
        <h4 className="card-title">{props.data.title}</h4>
        {props.data.type =="sell" ?  <p className="h5">€{props.data.price}</p> : ""}
       
        <p className="cardText">{props.data.description}</p>
        <p className="cardLocation">{props.data.location}</p>
    </Link>
      
      </div>
    </div>
    </div>
  );
};

export default ProductCard;
