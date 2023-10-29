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
// import network from "../../assets/network.png";
import displaySignIn from "../../assets/displaySignIn.png";
const signIn = () => {
  return (
    <Container className="container-signin" fluid>
      <Row className="h-100 w-100">
        <Col
          className="h-100 justify-content-center d-flex align-items-center"
          sm={4}
        >
          <div className="w-100">
            <Row>
              <h2 className="m-5">Sign in to your account</h2>
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
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="password "
                  />
                </FormGroup>
                <h6 className="justify-content-end d-flex mt-2">
                  Forgot password?
                </h6>
              </Form>
              <div className=" justify-content-center d-flex">
                <Row>
                  <Button className="button-signin mt-4">Sign-in</Button>
                </Row>
              </div>
              <div className=" justify-content-center d-flex">
                <Button className="button-signup mt-4" outline>
                  {" "}
                  Sign-up
                </Button>
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

export default signIn;
