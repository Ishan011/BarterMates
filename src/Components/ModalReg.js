// Created modal component so that it could be shown on the same page where user is currently in
import React, { useState, useContext } from "react";
import { registerUser } from "../Services/auth-service";
import { AuthContext } from "../Context/AuthContext";
// Importing reactstrap and modal css
import styles from "./Modal.module.css";
import { Form, Row, Col, Container } from "reactstrap";

// Modal component (uses destructuring, onChange events)
const ModalR = ({ setModalState }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useContext(AuthContext);

  const handleValueChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegisterUser = async (event) => {
    event.preventDefault();
    const response = await registerUser(userData);
    console.log(response);
    if (response.data.status) {
      setIsAuthenticated(true);
      setUser({
        name: userData.name,
        email: userData.email,
      });
      setModalState(false)
    }
  };

  return (
    <>
      <div className={styles.darkBG} onClick={() => setModalState(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <Container>
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>Join Us</h5>
              <button
                className={styles.closeBtn}
                onClick={() => setModalState(false)}
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
            </div>
            <div className={styles.modalContent}>
              <p className={styles.secHead}>Add your details below</p>

              <Form onSubmit={handleRegisterUser}>
                <Row>
                  <Col className={styles.formInput}>
                    <input className={styles.Input}
                      name="name"
                      id="name"
                      onChange={handleValueChange}
                      placeholder="Full Name"
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className={styles.formInput}>
                    <input className={styles.Input}
                      name="email"
                      id="email"
                      onChange={handleValueChange}
                      placeholder="Email Address"
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className={styles.formInput}>
                    <input className={styles.Input}
                      name="password"
                      id="password"
                      onChange={handleValueChange}
                      placeholder="Password"
                      type="password"
                      required
                    />
                  </Col>
                </Row>

                <div className={styles.modalActions}>
                  <Row>
                    <Col>
                      <button
                        className={styles.btnAuth}
                        type="submit"
                      >
                        Register
                      </button>
                    </Col>
                  </Row>
                </div>
              </Form>

              <Row>
                <button
                  className={styles.altLink}
                  onClick={() => {
                    setModalState("login");
                  }}
                >
                  Already have an account? Login
                </button>
              </Row>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default ModalR;
