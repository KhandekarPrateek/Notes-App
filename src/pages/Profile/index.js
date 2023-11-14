import React, { useContext, useState } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import profile from "../../assets/profile.png";
import NavigationBar from "../../common/NavigationBar";
import { UserContext } from "../../context/context";
import UserInfo from "./UserInfo";
import { createNewPassword } from "../../utils/firebase/firebase";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
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
      createNewPassword(setPassword);
    } else {
      alert(" passwords donot match");
    }
  };

  return (
    <>
      <Container className="profile-conatiner" fluid>
        <Row className="h-100">
          <NavigationBar />
          <Col sm={6} className="d-flex align-items-center ">
            <img src={profile} alt="profile-image" />{" "}
          </Col>
          <Col sm={6}>
            {" "}
            <Row>
              <h3 className="m-5">Your Profile</h3>

              <UserInfo info={currentUser.displayName} title={"Name"} />
              <UserInfo info={currentUser.email} title={"Email"} />

              <Form>
                <h3 className="m-5">Change password</h3>

                <FormGroup className="m-5">
                  <Label for="setPassword">Create Password</Label>
                  <Input
                    type="password"
                    name="setPassword"
                    id="SetPassword"
                    placeholder="Set password "
                    onChange={handlePasswordChangeSignIn}
                  />
                </FormGroup>
                <FormGroup className="m-5">
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
                  className=" button-signin m-5 d-flex justify-content-center align-items-center"
                  onClick={handlePasswordChange}
                >
                  Update
                </Button>
              </Form>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
