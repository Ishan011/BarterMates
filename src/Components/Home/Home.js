import React, { useState } from "react";
// importing components into home
import Banner from "./Banner";
import HomeSteps from "./HomeSteps";
// importing home stylesheet
import './Home.css';

const Home = (props) =>{
  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const [modalState, setModalState] = useState(false);

  return (        
    <div>
      {/* Using components */}
      <Banner/>
      <HomeSteps/>
    </div>
    )}
    
export default Home;