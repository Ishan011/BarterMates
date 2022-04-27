import { useEffect, useState } from "react";

// importing required service
import { getProductDetails } from "../../Services/inventory-service";

// importing router 
import { Link } from "react-router-dom";

// importing reactstrap component and stylesheet 
import { Container, Button } from "reactstrap";
import "./ProductCard.css";
import Rating from "./Rating";

const ProductDetails = (props) => {
  const [productDetails, setProductDetails] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    (async () => {
      const productId = props.match.params.id;
      const response = await getProductDetails(productId);
      if (response && response.productDetail) {
        console.log(response.productDetail);
        setProductDetails(response.productDetail);
        if (
          response.productDetail.images &&
          response.productDetail.images.length
        ) {
          setMainImage(response.productDetail.images[0]);
        }
      }
    })();
  }, []);

  return (
    <Container>
      <div className="row">
        <div className="col-md-7">
          <div className="card mt-4">
            {/* Custom made carousel to view product images  */}
            {productDetails &&
            productDetails.images &&
            productDetails.images.length ? (
              <div>
                {productDetails.images.map((image, index) => (
                  <button
                    className="cardCarouselImg"
                    onClick={() => {
                      setMainImage(image);
                    }}
                  >
                    <img key={index} style={{ height: "100px" }} src={image} />
                  </button>
                ))}
                <img src={mainImage} className="img-fluid" id="main" />
              </div>
            ) : (
              ""
            )}
          </div>
          {productDetails ? (
            <>
              <div className="card my-2 p-3">
                <p className="h5">Product specifications</p>
                {productDetails.specifications.map((element) => (
                  <p>
                    {element.key}: {element.value}
                  </p>
                ))}
              </div>
              <div className="card my-2 p-3">
                <p className="h5">Product description</p>
                <p>{productDetails.description}</p>
                {
                  productDetails.type == "swap"?<p>{productDetails.swap}</p> :null
                }
              </div>
              

            </>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-4 mt-4">
          {productDetails ? (
            <>
              <div className="card p-3">
                <h3>{productDetails.title}</h3>
                <p className="type-label">{productDetails.type}</p>

                {
                  productDetails.type == "sell"?<p className="h3">{productDetails.price}</p> :null
                }



                <p className="detailLocation">{productDetails.location}</p>
                <div className="profileImage"></div>
                <p className="productOwner">
                  {productDetails.owner ? productDetails.owner.name : ""}
                </p>
                <Rating />
                <Link
                  to={"/chat/" + productDetails.owner._id}
                  className="chat-btn"
                >
                  Chat
                </Link>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
