import React, { useEffect, useState } from "react";
import { Col, Form, Row, FormGroup, Label, Input, Button } from "reactstrap";
import profile from "../../assets/profile.png";
import NavigationBar from "../../common/NavigationBar";
import UserInfo from "./UserInfo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../common/Loader";
const Profile = () => {
 
  const [loading, setLoading] = useState(false);
  const defaultPassword = {
    setPassword: "",
    confirmPassword: "",
  };
  const [passwordField, setPasswordField] = useState(defaultPassword);
  const { setPassword, confirmPassword } = passwordField;

  const handlePasswordChangeSignIn = (event) => {
    const { name, value } = event.target;
    setPasswordField({ ...passwordField, [name]: value });
  };

  const handlePasswordChange = () => {
    if (setPassword === confirmPassword) {
      // createNewPassword(setPassword);
    } else {
      toast.error(" passwords donot match", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Row className="profile-container">
            <NavigationBar />
            <Col sm={6} className="d-flex align-items-center ">
              <img src={profile} alt="profile-image" />{" "}
            </Col>
            <Col sm={6}>
              {" "}
              <Row>
                <h3 className="my-5">Your Profile</h3>
                <UserInfo info="Name"  />
                <UserInfo info="email" title={"Email"} />

                <Form>
                  <h3 className="my-5">Change password</h3>

                  <FormGroup className="my-5">
                    <Label for="setPassword">Create Password</Label>
                    <Input
                      type="password"
                      name="setPassword"
                      id="SetPassword"
                      placeholder="Set password "
                      onChange={handlePasswordChangeSignIn}
                    />
                  </FormGroup>
                  <FormGroup className="my-5">
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder=" Confirm password "
                      onChange={handlePasswordChangeSignIn}
                    />
                  </FormGroup>
                  <Button
                    className=" button-signin my-5 d-flex justify-content-center align-items-center"
                    onClick={handlePasswordChange}
                  >
                    Update
                  </Button>
                </Form>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Profile;
