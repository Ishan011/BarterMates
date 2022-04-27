// Component responsible for changing tabs in profile

// All similar tasks were done refering to this tutorial
// https://www.youtube.com/watch?v=WkREeDy2WQ4&ab_channel=TheWebSchool
import { useState } from "react";
import "./Tabs.css";
import Wishlist from "../WatchList";
import ProductsList from "../Product/ProductsList";
// importing assets
import noNotification from "../../assets/inbox.svg";
import noReview from "../../assets/noNotification.svg";

function Tabs(props) {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div>
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Wishlists
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Your listings
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Notifications
        </button>
        <button
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
          Reviews
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <div className="mt-5">
          <Wishlist />
          </div>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <div className="mt-5">
          {<ProductsList filter={{ selfOnly: true }} />}
          </div>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <div className="text-center m-5">
            <img
              src={noNotification}
              className="img-fluid"
              alt="No Notification"
              width="240px"
            />
            <p className="h4 mt-3 text-dark">
              You do not have any notifications
            </p>
          </div>
        </div>

        <div
          className={toggleState === 4 ? "content  active-content" : "content"}
        >
          <div className="text-center m-5">
            <img
              src={noReview}
              className="img-fluid"
              alt="No Notification"
            />
            <p className="h4 mt-3 text-dark">You have no reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
