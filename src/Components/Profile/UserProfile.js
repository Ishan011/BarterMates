// Component to show user profile
import { useEffect, useState } from "react";
import { getUserDetails, updateBio } from "../../Services/user-services";
// import reactstrap and stylesheet
import { Form, Label, Input, Container, Row } from "reactstrap";
import Tabs from "./Tabs";
import "./UserProfile.css";

const UserProfile = (props) => {
  const [userDetails, setUserDetails] = useState();
  const [bio, setBio] = useState("");

  useEffect(() => {
    (async () => {
      console.log("test");

      const response = await getUserDetails();
      if (response && response.status) {
        setUserDetails({
          ...response.userDetails,
        });
      }
      console.log("response", response.userDetails);
    })();
  }, []);

  const handleBioSubmit = async (event) => {
    event.preventDefault();

    const response = await updateBio(bio);

    console.log(response);
  };
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  return (
    <Container>
      <Row className="mt-4 justify-content-between">
        <div className="col-md-4 order-md-1 order-2 bio-block">
          <div className="card shadow-sm">
            {userDetails ? (
              <>
                <div className="userDetail">
                  <div className="profileImage"></div>
                  <div className="h4">{userDetails.name}</div>
                </div>
              </>
            ) : (
              ""
            )}

            <Form onSubmit={handleBioSubmit}>
              <div className="px-3">
                <Label>Bio</Label>
                <Input
                  name="bio"
                  id="bio"
                  type="textarea"
                  placeholder="What do you wish to tell us about yourself?"
                  onChange={handleBioChange}
                  value={userDetails ? userDetails.bio : ""}
                />
                <button className="bio-btn" type="submit">
                  Update Bio
                </button>
              </div>
            </Form>
          </div>

          <button className="signout mt-5" type="submit">
            <svg
              width="20"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 4.8259V2.9999C13 2.72327 12.9426 2.44966 12.8314 2.19635C12.7203 1.94304 12.5578 1.71554 12.3542 1.52823C12.1507 1.34093 11.9104 1.19789 11.6488 1.10815C11.3871 1.01842 11.1097 0.983941 10.834 1.0069L2.834 1.6729C2.33405 1.71454 1.86801 1.94255 1.5283 2.31171C1.18859 2.68087 1.00002 3.16422 1 3.6659V15.9859C1.00002 16.4876 1.18859 16.9709 1.5283 17.3401C1.86801 17.7093 2.33405 17.9373 2.834 17.9789L10.834 18.6459C11.1098 18.6689 11.3873 18.6344 11.649 18.5446C11.9107 18.4548 12.151 18.3116 12.3546 18.1242C12.5582 17.9368 12.7206 17.7092 12.8317 17.4558C12.9428 17.2023 13.0001 16.9286 13 16.6519V14.8259M12 9.8259H21H12ZM21 9.8259L17.667 5.8259L21 9.8259ZM21 9.8259L17.667 13.8259L21 9.8259Z"
                stroke="#EEEEEE"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="mx-3">Sign Out</span>
          </button>
        </div>

        <div className="col-md-8 card shadow-sm order-md-2 order-1">
          <Tabs />
        </div>
      </Row>
    </Container>
  );
};

export default UserProfile;
