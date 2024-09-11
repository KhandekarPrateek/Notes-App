import React, { useContext } from "react";
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
import displaySignIn from "../../assets/displaySignIn.png";

import { ThemeContext } from "../../utils/ThemeContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignIn = () => {
  const defaultFormFields = {
    email: "",
    password: "",
  };
  const [formFieldsSignIn, setFormFieldsSignIn] = useState(defaultFormFields);
 
  const handleChangeSignIn = (event) => {
    const { name, value } = event.target;
    setFormFieldsSignIn({ ...formFieldsSignIn, [name]: value });
  };

  const navigate = useNavigate();

  const routeTosignUp = () => {
    navigate("/signup");
  };

  // const routeToDashboard = (dashboardName) => {
  //   navigate(`/dashboard/${dashboardName}`);
  // };

  // const navigateToDashboard = (user) => {
  //   const { emailVerified, displayName } = user;
  //   emailVerified ? routeToDashboard(displayName) : console.log("error");
  // };

  
 
  const handleSignIn = async () => {
  
    try {
      const response = await fetch("https://notes-app-gilt-chi.vercel.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formFieldsSignIn.email,
          password: formFieldsSignIn.password,
        }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg);
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.user.name);

      toast.success("Login successful!");
      console.log(data)
      navigate(`/dashboard/${data.user.name}`);
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
    }
  };
  return (
    <>
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
                      onChange={handleChangeSignIn}
                    />
                  </FormGroup>
                  <h6 className="justify-content-end d-flex mt-2">
                    Forgot password?
                  </h6>
                </Form>
                <div className=" justify-content-center d-flex">
                  
                </div>
                <Row>
                  <div className=" justify-content-center d-flex">
                    <Button
                      className="button-signup mt-4"
                      outline
                      onClick={handleSignIn}
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
            <img
              src={displaySignIn}
              alt="sign-in-photo"
              backgroundColor="white"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignIn;
