// Component for showing inventory listings in list  
import React, { useState, useEffect} from "react";
import { Container } from "reactstrap";
import {
    getProductsList
} from '../../Services/inventory-service';
import ProductCard from "./ProductCard";
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