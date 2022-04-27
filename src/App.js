import React, { useContext } from "react";
import "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from "./Components/Home/Home";
import Profile from "./Components/Profile";
import { AuthContext } from "./Context/AuthContext";
import ProtectedRoute from "./hocs/ProtectedRoute";
import PublicRoute from "./hocs/PublicRoute";
import ChatRoom from "./Components/Chat/ChatRoom";
import Modal from "./Components/ModalLog";
import ModalR from "./Components/ModalReg";
import AddNewListing from "./Components/AddNewListing";
import Navibar from "./Components/Navbar";
import SearchResult from "./Components/SearchResult";
import UserProfile from "./Components/Profile/UserProfile";
import ProductDetails from "./Components/Product/ProductDetail";
import ChatroomList from "./Components/Chat/ChatRoomList";

function App(props) {
    const { isAuthenticated, user, modalState, setModalState} = useContext(AuthContext);

    console.log(isAuthenticated, user)
    return (
        <div className="App">
            {
                modalState ==="login"? <Modal setModalState={setModalState}/>:  
                modalState ==="register"? <ModalR setModalState={setModalState}/>:  ""
            }

            <Router>
                <Navibar />

                <Switch>
                            
                    <ProtectedRoute
                        path="/profile"  
                        component={Profile}
                    />
                    <ProtectedRoute exact path="/chat/:id" component={ChatRoom} />   
                    <ProtectedRoute exact path="/add-new-product" component={AddNewListing} />   
                    <ProtectedRoute exact path="/user-profile" component={UserProfile} />   
                    <ProtectedRoute exact path="/chat" component={ChatroomList} />   
                    <Route exact path="/" component={Home} />
                    <Route exact path="/search" component={SearchResult} />
                    <Route exact path="/product-details/:id" component={ProductDetails} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
