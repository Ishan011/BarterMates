// Component to showcase steps
import React from "react";
// import reactstrap
import { Container, Col, Row } from "reactstrap";
// import assets
import search from "../../assets/search.svg";
import listing from "../../assets/listing.svg";
import meet from "../../assets/meet.svg";

const HomeSteps = () => {
  return (
    <Container className="mt-4">
        <p className="h3">How to use Bartermates?</p>
        <Row className="mt-3">
        <Col md="4">
            <div className="card step">
                <img className="img-fluid step-img" width="200px" src={search} alt="Search what you wish"/>
                <p className="h5">Step 1</p>
                <p>Search for what your heart desires</p>
            </div>
        </Col> 
        <Col md="4">
        <div className="card step">
                <img className="img-fluid step-img" width="140px" src={listing} alt="Find a listing you like"/>
                <p className="h5">Step 2</p>
                <p>Like a listing? Watchlist it or maybe view details if you are really interested. </p>
            </div>
        </Col> 
        <Col md="4">
        <div className="card step">
                <img className="img-fluid step-img" width="200px" src={meet} alt="Meet in person to have exchange take place"/>
                <p className="h5">Step 3</p>
                <p>Chat with the owner and reach an agreement with them!</p>
            </div>
        </Col> 
        </Row>
    </Container>
  )};

export default HomeSteps;
