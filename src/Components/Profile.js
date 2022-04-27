import React from 'react';
// import AddProduct from './AddProduct';
import ProductsList from './Product/ProductsList';


const Profile = (props) =>{
    return <>
        <ProductsList filter={{wishlist: true}}/>
    </>
}

export default Profile;