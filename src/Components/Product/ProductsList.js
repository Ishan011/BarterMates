// Component for showing inventory listings in list  
import React, { useState, useEffect} from "react";
// importing reactstrap component 
import { Container } from "reactstrap";
// importing required service
import {
    getProductsList
} from '../../Services/inventory-service';
// importing component 
import ProductCard from "./ProductCard";
// importing asset
import notFound from "../../assets/noResult.svg";

const ProductsList = (props) =>{

    const [products, setProducts] = useState([]);

    useEffect(() =>{
        (async() =>{
            console.log("called", props.filter)

                const productsList = await getProductsList({filter:props.filter});
                
                if(productsList){
                    setProducts([
                        ...productsList.data.products
                    ])
                }
        })()
    },[props.filter])
    
    // Rendering JSX
    return <>     
        <Container>
            <div className="row">
        {products.map(element =>(
            <ProductCard data = {element}/>
            ))}

        {
            products.length == 0 ? <div className="text-center"><img className='img-fluid' width='240px' src={notFound} alt='illustration'/><p className='h4 mt-3'>No Products found</p></div>: ""
        }
        </div>
        </Container>
    </>
}
export default ProductsList;