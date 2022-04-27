// Creating component for banner in homepage
import React from "react";

// importing reactstrap component
import { Container } from "reactstrap";
// importing asset
import HomeBanner from "../../assets/banner.png";

// rendering JSX
const Banner = () => {
    return (
        <Container>
                <img className="img-fluid mt-4 bannerSize" src={HomeBanner} alt="Home Banner"/>
        </Container>
    )}

export default Banner;