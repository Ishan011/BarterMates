// Component responsible for showing list of listings watchlisted by user 
import {
    getWishlistProducts
} from "../Services/inventory-service";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import ProductCard from "./Product/ProductCard";
import notFound from "../assets/noResult.svg";


const Wishlist = (props) =>{

    const [products, setProducts] = useState([])

    useEffect(()=>{
        (async()=>{
            const response = await getWishlistProducts();
            if(response && response.status){
                console.log("response",response);
                setProducts([
                    ...response.data.products
                ])
            }

            console.log("wishlistdata" , response.data.products)
        })();
    },[])

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

export default Wishlist;