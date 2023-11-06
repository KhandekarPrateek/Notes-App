import React from "react";
import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import displaySignIn from "../../../assets/displaySignIn.png";
import {
  signInwithGooglePopup,
  createUserDocumentFromUserAuth,
  signInUserWithEmailAndPassword,
} from "../../../utils/firebase/firebase";
const SignIn = () => {
  const defaultFormFields = {
    email: "",
    password: "",
  };
  const [formFieldsSignIn, setFormFieldsSignIn] = useState(defaultFormFields);
  const { email, password } = formFieldsSignIn;
  const handleChangeSignIn = (event) => {
    const { name, value } = event.target;
    setFormFieldsSignIn({ ...formFieldsSignIn, [name]: value });
  };

  console.log(formFieldsSignIn);
  const navigate = useNavigate();

  const routeTosignUp = () => {
    navigate("/signup");
  };

  const navigateToDashboard = (response) => {
    response._tokenResponse.emailVerified
      ? navigate("/dashboard")
      : console.log("error");
  };
  const logWithGoogleUser = async () => {
    // const response = await signInwithGooglePopup();
    const { user } = await signInwithGooglePopup();

    // navigateToDashboard(response);
    await createUserDocumentFromUserAuth(user);
  };
  const clearFormFields = () => {
    setFormFieldsSignIn(defaultFormFields);
  };
  const handleEmailAndPasswordSignIn = async (event) => {
    event.preventDefault();
    console.log("hi");
    try {
      console.log("hello");
      const response = await signInUserWithEmailAndPassword(email, password);
      console.log(response, "response");

      clearFormFields();
    } catch (error) {
      if (error.message === "auth/invalid-login-credentials") {
        alert("enter correct id or password");
      }
      console.log(error, "error");
    }
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
                    // value={email}
                    onChange={handleChangeSignIn}
                  />
                </FormGroup>
                <FormGroup className="m-5">
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password "
                    // value={password}
                    onChange={handleChangeSignIn}
                  />
                </FormGroup>
                <h6 className="justify-content-end d-flex mt-2">
                  Forgot password?
                </h6>
              </Form>
              <div className=" justify-content-center d-flex">
                <Row>
                  <Button
                    className="button-signin mt-4"
                    onClick={logWithGoogleUser}
                  >
                    Google sign in
                  </Button>
                </Row>
              </div>
              <Row>
                <div className=" justify-content-center d-flex">
                  <Button
                    className="button-signup mt-4"
                    outline
                    onClick={handleEmailAndPasswordSignIn}
                  >
                    {" "}
                    Sign-in
                  </Button>
                </div>
              </Row>
              <Row>
                <div className=" justify-content-center d-flex">
                  <Button
                    className="button-signup mt-4"
                    outline
                    onClick={routeTosignUp}
                  >
                    {" "}
                    Sign-up
                  </Button>
                </div>
              </Row>
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

export default SignIn;
