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
} from "reactstrap";
import { useNavigate } from "react-router";
import displaySignIn from "../../../assets/displaySignIn.png";
const SignUp = () => {
  const navigate = useNavigate();
  const routeTosignIn = () => {
    navigate("/signin");
  };
  return (
    <Container className="container-signin" fluid>
      <Row className="h-100 w-100">
        <Col
          className="h-100 justify-content-center d-flex align-items-center"
          sm={4}
        >
          <div className="w-100">
            <Row>
              <h2 className="m-5">Sign up to create your new account</h2>
            </Row>
            <Row>
              <Form>
                {" "}
                <FormGroup className="m-5">
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Email"
                  />
                </FormGroup>
                <FormGroup className="m-5">
                  <Label for="examplePassword">Create Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="Set password "
                  />
                </FormGroup>
                <FormGroup className="m-5">
                  <Label for="examplePassword">Confirm Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder=" Confirm password "
                  />
                </FormGroup>
              </Form>
              <div className=" justify-content-center d-flex">
                <Row>
                  <Button className="button-signin mt-4">Create Account</Button>
                </Row>
              </div>
              <div className=" justify-content-center d-flex ">
                <Row>
                  <Button
                    className="button-signin mt-4 "
                    onClick={routeTosignIn}
                  >
                    Sign In
                  </Button>
                </Row>
              </div>
            </Row>
          </div>
        </Col>
        <Col
          className="display-signin h-100  justify-content-center d-flex align-items-center"
          sm={8}
        >
          <img src={displaySignIn} alt="sign-in-photo" />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
