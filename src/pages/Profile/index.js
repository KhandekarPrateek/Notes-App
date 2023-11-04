import React from "react";
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

const Profile = () => {
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
              <Form>
                <FormText>
                  <h3 className="m-5">Your Profile</h3>
                </FormText>{" "}
                <FormGroup className="m-5">
                  <Label>Name</Label>
                  <Input id="name" name="name" placeholder="Name" />
                </FormGroup>
                <FormGroup className="m-5">
                  <Label>Surname</Label>
                  <Input id="surname" name="surname" placeholder="Surname" />
                </FormGroup>
                <FormGroup className="m-5">
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Email"
                  />
                </FormGroup>
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
