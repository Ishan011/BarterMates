// Navbar component used in all pages
import React, { useContext, useState } from "react";
import { Input } from "reactstrap";
import Select from "react-select";
import "./Navbar.css";
import Logo from "../assets/logo.png";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";

const Navibar = () => {
  const { isAuthenticated, modalState, setModalState  } = useContext(AuthContext);

  // Filter using category made possible
  const categoryOptions = [
    { value: "", label: "All" },
    { value: "electronics", label: "Electronics" },
    { value: "fashionandaccesories", label: "Fashion & Accessories" },
    { value: "sportsandleisure", label: "Sports & Leisure" },
    { value: "vehcileandparts", label: "Vehicle & Parts" },
    { value: "homeandfurniture", label: "Home & Furniture" },
    { value: "healthandbeauty", label: "Health & Beauty" },
    { value: "babyandtoddler", label: "Baby & Toddler" },
    { value: "other", label: "Other" },
  ];

  const [filters, setFilters] = useState({})
  
  const handleOptionChange = (event) =>{
    setFilters({
      ...filters,
      category: event.value
    })
  } 
  const handleInputChange = (event)=>{
    setFilters({
      ...filters,
      keyword: event.target.value
    })
    console.log(filters)
  }





  return (
    <div className="nav-block">
      <div className="container">
        <div className="row nav-content">
          <div className="col-md-2">
            <a className="navbar-brand" href="/">
              <img src={Logo} alt="Logo" />
            </a>
          </div>

          <div className="col-md-6">
            <div class="input-group my-3">
              <Select
                name="category"
                id="category"
                options={categoryOptions}
                onChange={handleOptionChange}
                placeholder="Categories"
              />{" "}
              <Input
                name="keyword"
                id="keyword"
                placeholder="Search for mobiles, books, etc"
                className="input-search"
                onChange={handleInputChange}
              />
              <Link className="search-btn"
                to = {{
                  pathname: "/search",
                  state: filters
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.6667 15C10.1876 14.9997 8.75104 14.5045 7.58587 13.5934L3.92254 17.2567L2.74421 16.0784L6.40754 12.415C5.49587 11.2497 5.0004 9.81288 5.00004 8.33335C5.00004 4.65752 7.99087 1.66669 11.6667 1.66669C15.3425 1.66669 18.3334 4.65752 18.3334 8.33335C18.3334 12.0092 15.3425 15 11.6667 15ZM11.6667 3.33335C8.90921 3.33335 6.66671 5.57585 6.66671 8.33335C6.66671 11.0909 8.90921 13.3334 11.6667 13.3334C14.4242 13.3334 16.6667 11.0909 16.6667 8.33335C16.6667 5.57585 14.4242 3.33335 11.6667 3.33335Z"
                    fill="black"
                    fill-opacity="0.72"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="col-md-4 nav-options">
            <Link className="nav-opt" to="/add-new-product">
              <span className="add-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 9H6M9 6V9V6ZM9 9V12V9ZM9 9H12H9Z"
                    stroke="black"
                    stroke-opacity="0.72"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                    stroke="black"
                    stroke-opacity="0.72"
                    stroke-width="2"
                  />
                </svg>
              </span>
              List a Product
            </Link>

            {isAuthenticated ? (
              <Link className="nav-opt" to="/chat">
                Chat
              </Link>
            ) : (
              <button className="btn-opt" onClick={() => setModalState("login")}>
                  Login
              </button>
            )}

            {isAuthenticated ? (
              <Link className="nav-opt" to="/user-profile">
                Profile
              </Link>
            ) : (
              <button className="btn-opt" onClick={() => setModalState("register")}>
                  Register
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navibar;
