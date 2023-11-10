import React, { useContext } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
} from "reactstrap";
import profile from "../../assets/profile.png";
import NavigationBar from "../../common/NavigationBar";
import { UserContext } from "../../context/context";
import UserInfo from "./UserInfo";

const Profile = () => {
  const { currentUser } = useContext(UserContext);

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
              {/* <UserInfo info={currentUser.displayName}  title={Name}/> */}

              <Form>
                <h3 className="m-5">Change password</h3>
                <FormGroup className="m-5">
                  <Label for="SetPassword">Old Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="OldPassword"
                    placeholder="Old password "
                  />
                </FormGroup>
                <FormGroup className="m-5">
                  <Label for="SetPassword">Create Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="SetPassword"
                    placeholder="Set password "
                  />
                </FormGroup>
                <FormGroup className="m-5">
                  <Label for="ConfirmPassword">Confirm Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="ConfirmPassword"
                    placeholder=" Confirm password "
                  />
                </FormGroup>
                <Button className=" button-signin m-5 d-flex justify-content-center align-items-center">
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
