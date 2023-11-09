import React from "react";
import { useState, useContext } from "react";
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
  getData,
} from "../../../utils/firebase/firebase";
import { UserContext } from "../../../context/context";
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

  // console.log(formFieldsSignIn);
  const navigate = useNavigate();

  const routeTosignUp = () => {
    navigate("/signup");
  };

  const routeToDashboard = (dashboardName) => {
    // console.log(dashboardName, "dashboardName");
    navigate(`/dashboard/${dashboardName}`);
  };

  const navigateToDashboard = (user) => {
    const { emailVerified, displayName } = user;
    emailVerified ? routeToDashboard(displayName) : console.log("error");
  };
  const { setCurrentUser } = useContext(UserContext);

  const logWithGoogleUser = async () => {
    try {
      const { user } = await signInwithGooglePopup();
      console.log(user);
      await createUserDocumentFromUserAuth(user);
      console.log(user.displayName, "display name");
      setCurrentUser(user.displayName);

      navigateToDashboard(user);
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        alert("google popup faiilure");
      }
    }
  };
  const clearFormFields = () => {
    setFormFieldsSignIn(defaultFormFields);
  };

  const handleEmailAndPasswordSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await signInUserWithEmailAndPassword(email, password);

      const response2 = await getData(response.user.uid);

      if (response2.Name) {
        setCurrentUser(response2.Name);
        console.log(response2.Name, "name from email and password");
        routeToDashboard(response2.Name);
      } else {
        console.log("Cant access your data");
      }

      clearFormFields();
    } catch (error) {
      if (error.code === "auth/invalid-login-credentials") {
        alert("enter correct password");
      }
      if (error.code === "auth/popup-closed-by-user") {
        alert("Sign in via gmail or sign up otherwise");
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
                    type="button"
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
