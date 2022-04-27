// Component responsible for adding new listing into inventory
import React, { useState } from "react";
import { addProductToInventory } from "../Services/inventory-service";
// importing reactstrap and stylesheet
import { Button, Form, Input, Row, Col, Label } from "reactstrap";
// npm package
import Select from "react-select";
import "./AddProduct.css";

const AddNewListing = (props) => {
  // Initially setting all fields as empty strings  
  const [productDetails, setProductDetails] = useState({
    title: "",
    location: "",
    category: "",
    type: "",
    price: "",
    description: "",
    swap: "",
    // custom set specs 
    specifications: [
      {
        key: "Brand",
        value: "",
      },
      {
        key: "Condition",
        value: "",
      },
      {
        key: "Color",
        value: "",
      },
      {
        key: "",
        value: "",
      },
    ],
    images: [],
  });

  const locationOptions = [
    { value: "dublin", label: "Dublin" },
    { value: "cork", label: "Cork" },
    { value: "galway", label: "Galway" },
    { value: "limerick", label: "Limerick" },
    { value: "letterkenny", label: "Letterkenny" },
    { value: "waterford", label: "Waterford" },
  ];

  const categoryOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "fashionandaccesories", label: "Fashion & Accessories" },
    { value: "sportsandleisure", label: "Sports & Leisure" },
    { value: "vehcileandparts", label: "Vehicle & Parts" },
    { value: "homeandfurniture", label: "Home & Furniture" },
    { value: "healthandbeauty", label: "Health & Beauty" },
    { value: "babyandtoddler", label: "Baby & Toddler" },
    { value: "other", label: "Other" },
  ];

  const blobToBase64= (blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const handleImageChange = async(e) => {
		if (e.target.files) {
      let images = []

      // console.log(e.target.files[1])

      // const file = e.target.files[1];

      //   const base64 = await blobToBase64(file);

      //   console.log(base64)

      for(const file of e.target.files){
        console.log(file)
        const base64 = await blobToBase64(file);
        images.push(base64);
      }

      setProductDetails({
        ...productDetails,
        images
      })


			// console.log("filesArray: ", filesArray);

			// setSelectedFiles((prevImages) => prevImages.concat(filesArray));
			// Array.from(e.target.files).map(
			// 	(file) => URL.revokeObjectURL(file) 
			// );
		}
	};

  const handleValueChange = (event) => {
    console.log(event.target.name)
    setProductDetails({
      ...productDetails,
      [event.target.name]: event.target.value,
    });

  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    console.log(productDetails)
    const response = await addProductToInventory(productDetails);
    console.log(response);
    if(response){
      window.location.href = "/user-profile";
    }
  };

  const handleChangeOption = (value, name) => {
    console.log(value, name);
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };

  const handleSpecsChange = (type, index, value) => {
    let updatedSpecs = [...productDetails.specifications];
    updatedSpecs[index][type] = value;
    setProductDetails({
      ...productDetails,
      specifications: updatedSpecs,
    });
  };

  const removeSpec = (index) => {
    let updatedSpecs = [...productDetails.specifications];
    updatedSpecs.splice(index, 1);
    setProductDetails({
      ...productDetails,
      specifications: updatedSpecs,
    });
  };

  const addMoreSpec = () => {
    let updatedSpecs = [...productDetails.specifications];
    updatedSpecs.push({
      key: "",
      value: "",
    });
    setProductDetails({
      ...productDetails,
      specifications: updatedSpecs,
    });
  };

  const removeImage = (index) =>{

    let images = productDetails.images;

    images.splice(index, 1);

    setProductDetails({
      ...productDetails,
      images
    })
  }


  return (
    <>

     


      <div className="container">
        <p className="h4 mt-4">Add new listing</p>
        <Form onSubmit={handleAddProduct}>
          <div className="form-list px-3 px-lg-5 py-3">
            <Row>
              <Col>
                <Label>Title</Label>
                <Input
                  name="title"
                  id="title"
                  onChange={handleValueChange}
                  placeholder="What do you wish to upload?"
                  required
                />
              </Col>
            </Row>

            <Row className="my-4">
              <Col>
                <Label>Location</Label>
                <Select
                  options={locationOptions}
                  name="location"
                  onChange={(event) => {
                    handleChangeOption(event.value, "location");
                  }}
                  required
                />
              </Col>
              <Col>
                <Label>Category</Label>
                <Select
                  options={categoryOptions}
                  name="category"
                  onChange={(event) => {
                    handleChangeOption(event.value, "category");
                  }}
                  required
                />
              </Col>
            </Row>
          </div>

          <div className="form-list px-3 px-lg-5 py-3 my-4">
            <Row>
              <Label>Type of listing</Label>
              <Col>
                <Input
                  name="type"
                  id="type"
                  onChange={handleValueChange}
                  type="radio"
                  value="sell"
                />{" "}
                <Label for="sell">Sell</Label>
                <Input
                  name="type"
                  id="type"
                  onChange={handleValueChange}
                  type="radio"
                  value="swap"
                />{" "}
                <Label for="swap">Swap</Label>
                <Input
                  name="type"
                  id="type"
                  onChange={handleValueChange}
                  type="radio"
                  value="free"
                />{" "}
                <Label for="free">Free</Label>
              </Col>
            </Row>
            <Row className="mt-3">
            
            {productDetails && productDetails.type == "sell" ? 
            
              <Col>
                  <Label>Price</Label>
                  <Input
                    name="price"
                    id="price"
                    type="number"
                    onChange={handleValueChange}
                    placeholder="Enter Price"
                    required
                  />
                </Col>: 
                productDetails && productDetails.type == "swap" ? 
                
                <Col>
                  <Label>Swap preference (optional)</Label>
                  <Input
                  name="swap"
                  id="swap"
                  type="textarea"
                  placeholder="What would you like to exchange it for?"
                  onChange={handleValueChange}
                />
                </Col>
                : (
                ""
              )}
            </Row>
          </div>

          <div className="form-list px-3 px-lg-5 py-3 my-4">
            <Row>
              <Label>Add photos</Label>
              <Col>
        				<Input type="file" id="file" multiple onChange={handleImageChange} />  
                {
                  productDetails.images.map((imageData, index)=>
                    <>
                      <img style={{height: "100px" }} key={index} src={imageData}/>
                       <button
                        className="remove-btn"
                        onClick={() => {
                          removeImage(index);
                        }}
                      >
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24 4C20.0444 4 16.1776 5.17298 12.8886 7.37061C9.59962 9.56824 7.03617 12.6918 5.52242 16.3463C4.00867 20.0009 3.6126 24.0222 4.3843 27.9018C5.15601 31.7814 7.06082 35.3451 9.85787 38.1421C12.6549 40.9392 16.2186 42.844 20.0982 43.6157C23.9778 44.3874 27.9992 43.9913 31.6537 42.4776C35.3082 40.9638 38.4318 38.4004 40.6294 35.1114C42.827 31.8224 44 27.9556 44 24C44 21.3736 43.4827 18.7728 42.4776 16.3463C41.4725 13.9198 39.9993 11.715 38.1421 9.85786C36.285 8.00069 34.0802 6.5275 31.6537 5.52241C29.2272 4.51732 26.6264 4 24 4V4ZM24 40C20.8355 40 17.7421 39.0616 15.1109 37.3035C12.4797 35.5454 10.4289 33.0466 9.21794 30.1229C8.00693 27.1993 7.69008 23.9823 8.30745 20.8786C8.92481 17.7749 10.4487 14.9239 12.6863 12.6863C14.9239 10.4487 17.7749 8.9248 20.8786 8.30744C23.9823 7.69007 27.1993 8.00693 30.1229 9.21793C33.0466 10.4289 35.5454 12.4797 37.3035 15.1109C39.0616 17.7421 40 20.8355 40 24C40 28.2435 38.3143 32.3131 35.3137 35.3137C32.3131 38.3143 28.2435 40 24 40V40Z"
                            fill="#333333"
                          />
                          <path
                            d="M29.4199 18.58C29.234 18.3925 29.0128 18.2438 28.769 18.1422C28.5253 18.0407 28.2639 17.9884 27.9999 17.9884C27.7359 17.9884 27.4744 18.0407 27.2307 18.1422C26.987 18.2438 26.7658 18.3925 26.5799 18.58L23.9999 21.18L21.4199 18.58C21.0433 18.2034 20.5325 17.9918 19.9999 17.9918C19.4673 17.9918 18.9565 18.2034 18.5799 18.58C18.2033 18.9566 17.9917 19.4674 17.9917 20C17.9917 20.5326 18.2033 21.0434 18.5799 21.42L21.1799 24L18.5799 26.58C18.3924 26.7659 18.2436 26.9871 18.1421 27.2308C18.0406 27.4746 17.9883 27.736 17.9883 28C17.9883 28.264 18.0406 28.5254 18.1421 28.7692C18.2436 29.0129 18.3924 29.2341 18.5799 29.42C18.7658 29.6075 18.987 29.7562 19.2307 29.8578C19.4744 29.9593 19.7359 30.0116 19.9999 30.0116C20.2639 30.0116 20.5253 29.9593 20.769 29.8578C21.0128 29.7562 21.234 29.6075 21.4199 29.42L23.9999 26.82L26.5799 29.42C26.7658 29.6075 26.987 29.7562 27.2307 29.8578C27.4744 29.9593 27.7359 30.0116 27.9999 30.0116C28.2639 30.0116 28.5253 29.9593 28.769 29.8578C29.0128 29.7562 29.234 29.6075 29.4199 29.42C29.6073 29.2341 29.7561 29.0129 29.8577 28.7692C29.9592 28.5254 30.0115 28.264 30.0115 28C30.0115 27.736 29.9592 27.4746 29.8577 27.2308C29.7561 26.9871 29.6073 26.7659 29.4199 26.58L26.8199 24L29.4199 21.42C29.6073 21.2341 29.7561 21.0129 29.8577 20.7692C29.9592 20.5254 30.0115 20.264 30.0115 20C30.0115 19.736 29.9592 19.4746 29.8577 19.2308C29.7561 18.9871 29.6073 18.7659 29.4199 18.58V18.58Z"
                            fill="#333333"
                          />
                        </svg>
                      </button>
                  </>
                    
                  )
                }    
              </Col>
            </Row>
          </div>

          <div className="form-list px-3 px-lg-5 py-3">
            <Row>
              <Label>Specifications</Label>
              <Col>
                {productDetails.specifications.map((element, index) => (
                  <Row>
                    <Col>
                      <Input
                        className="input-spec"
                        name="specs"
                        id="specs"
                        value={element.key}
                        onChange={(event) => {
                          handleSpecsChange("key", index, event.target.value);
                        }}
                        required
                      />
                    </Col>
                    <Col>
                      <Input
                        className="input-spec"
                        name="specs"
                        id="specs"
                        onChange={(event) => {
                          handleSpecsChange("value", index, event.target.value);
                        }}
                      />
                    </Col>
                    <Col>
                      <button
                        className="remove-btn"
                        onClick={() => {
                          removeSpec(index);
                        }}
                      >
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24 4C20.0444 4 16.1776 5.17298 12.8886 7.37061C9.59962 9.56824 7.03617 12.6918 5.52242 16.3463C4.00867 20.0009 3.6126 24.0222 4.3843 27.9018C5.15601 31.7814 7.06082 35.3451 9.85787 38.1421C12.6549 40.9392 16.2186 42.844 20.0982 43.6157C23.9778 44.3874 27.9992 43.9913 31.6537 42.4776C35.3082 40.9638 38.4318 38.4004 40.6294 35.1114C42.827 31.8224 44 27.9556 44 24C44 21.3736 43.4827 18.7728 42.4776 16.3463C41.4725 13.9198 39.9993 11.715 38.1421 9.85786C36.285 8.00069 34.0802 6.5275 31.6537 5.52241C29.2272 4.51732 26.6264 4 24 4V4ZM24 40C20.8355 40 17.7421 39.0616 15.1109 37.3035C12.4797 35.5454 10.4289 33.0466 9.21794 30.1229C8.00693 27.1993 7.69008 23.9823 8.30745 20.8786C8.92481 17.7749 10.4487 14.9239 12.6863 12.6863C14.9239 10.4487 17.7749 8.9248 20.8786 8.30744C23.9823 7.69007 27.1993 8.00693 30.1229 9.21793C33.0466 10.4289 35.5454 12.4797 37.3035 15.1109C39.0616 17.7421 40 20.8355 40 24C40 28.2435 38.3143 32.3131 35.3137 35.3137C32.3131 38.3143 28.2435 40 24 40V40Z"
                            fill="#333333"
                          />
                          <path
                            d="M29.4199 18.58C29.234 18.3925 29.0128 18.2438 28.769 18.1422C28.5253 18.0407 28.2639 17.9884 27.9999 17.9884C27.7359 17.9884 27.4744 18.0407 27.2307 18.1422C26.987 18.2438 26.7658 18.3925 26.5799 18.58L23.9999 21.18L21.4199 18.58C21.0433 18.2034 20.5325 17.9918 19.9999 17.9918C19.4673 17.9918 18.9565 18.2034 18.5799 18.58C18.2033 18.9566 17.9917 19.4674 17.9917 20C17.9917 20.5326 18.2033 21.0434 18.5799 21.42L21.1799 24L18.5799 26.58C18.3924 26.7659 18.2436 26.9871 18.1421 27.2308C18.0406 27.4746 17.9883 27.736 17.9883 28C17.9883 28.264 18.0406 28.5254 18.1421 28.7692C18.2436 29.0129 18.3924 29.2341 18.5799 29.42C18.7658 29.6075 18.987 29.7562 19.2307 29.8578C19.4744 29.9593 19.7359 30.0116 19.9999 30.0116C20.2639 30.0116 20.5253 29.9593 20.769 29.8578C21.0128 29.7562 21.234 29.6075 21.4199 29.42L23.9999 26.82L26.5799 29.42C26.7658 29.6075 26.987 29.7562 27.2307 29.8578C27.4744 29.9593 27.7359 30.0116 27.9999 30.0116C28.2639 30.0116 28.5253 29.9593 28.769 29.8578C29.0128 29.7562 29.234 29.6075 29.4199 29.42C29.6073 29.2341 29.7561 29.0129 29.8577 28.7692C29.9592 28.5254 30.0115 28.264 30.0115 28C30.0115 27.736 29.9592 27.4746 29.8577 27.2308C29.7561 26.9871 29.6073 26.7659 29.4199 26.58L26.8199 24L29.4199 21.42C29.6073 21.2341 29.7561 21.0129 29.8577 20.7692C29.9592 20.5254 30.0115 20.264 30.0115 20C30.0115 19.736 29.9592 19.4746 29.8577 19.2308C29.7561 18.9871 29.6073 18.7659 29.4199 18.58V18.58Z"
                            fill="#333333"
                          />
                        </svg>
                      </button>
                    </Col>
                  </Row>
                ))}
                <Button className="btn" onClick={addMoreSpec}>
                  Add More
                </Button>
              </Col>
            </Row>
          </div>

          <div className="form-list px-3 px-lg-5 py-3 my-4">
            <Row>
              <Label>Item Description</Label>
              <Col>
                <Input
                  name="description"
                  id="description"
                  type="textarea"
                  onChange={handleValueChange}
                  placeholder="Enter Description"
                />
              </Col>
            </Row>
          </div>
        
        <div className="text-center">
          <button className="btn-addproduct" type="submit">
            Add Product
          </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddNewListing;
