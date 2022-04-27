// Component responsible for search result page
import { useEffect, useState } from "react";
import ProductsList from "./Product/ProductsList";
import Select from 'react-select';
import {
    Row,
    Col,
    Container
} from 'reactstrap';
import { useLocation } from "react-router-dom";

const SearchResult = (props) =>{
    
    const data = useLocation();
    const [filter, setFilter] = useState({});
    useEffect(()=>{
      console.log("data.state",data.state)
      setFilter({
        ...filter,
        ...data.state
      })
    },[data.state])

    const locationOptions = [
        { value: "", label: "All" },
        { value: "dublin", label: "Dublin" },
        { value: "cork", label: "Cork" },
        { value: "galway", label: "Galway" },
        { value: "limerick", label: "Limerick" },
        { value: "letterkenny", label: "Letterkenny" },
        { value: "waterford", label: "Waterford" },
    ];

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

    const typeOptions = [
      { value: "", label: "All" },
        { value: "free", label: "Free" },
        { value: "sell", label: "Sell" },
        { value: "swap", label: "Swap" }
    ];

    const handleChangeOption = (value, key) =>{
        setFilter({
            ...filter,
            [key]: value
        })
    }

    return <>
      <Container>
            <Row className="my-4">
              <Col>
                <Select
                  options={locationOptions}
                  name="location"
                  onChange={(event) => {
                    handleChangeOption(event.value, "location");
                  }}
                  placeholder="Location"
                />
              </Col>
              <Col>
                <Select
                  options={categoryOptions}
                  name="category"
                  onChange={(event) => {
                    handleChangeOption(event.value, "category");
                  }}
                  placeholder="Category"
                />
              </Col>
              <Col>
                <Select
                  options={typeOptions}
                  name="type"
                  onChange={(event) => {
                    handleChangeOption(event.value, "type");
                  }}
                  placeholder="Type"
                />
              </Col>
        </Row>
        <ProductsList
            filter = {filter}
        />
        </Container>
    </>
}

export default SearchResult;