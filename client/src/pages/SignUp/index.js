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
import { useNavigate } from "react-router";
import displaySignIn from "../../assets/displaySignIn.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const defaultFormField = {
    Name: "",
    email: "",
    setPassword: "",
    ConfirmPassword: "",
  };
  const [formField, setFormField] = useState(defaultFormField);
  const { Name,  email, setPassword, ConfirmPassword } = formField;
  // NOtes:the value and state are circular i.e if value changes state changes and state change tells what to display

  const clearFormFields = () => {
    setFormField(defaultFormField);
  };
  const handleFormFieldChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };
  const handleFormSubmit = async () => {
    if (setPassword !== ConfirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
  
    try {
      const response = await fetch("https://notes-app-gilt-chi.vercel.app/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formField.Name,
          email: formField.email,
          password: formField.setPassword,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      toast.success("Registration successful!");
      console.log(data);
  
      clearFormFields();
      navigate("/signin");
    } catch (error) {
      toast.error("Registration failed!");
      console.error("Error:", error);
    }
  };
  
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
                {/* Note the name attribute means what the particular form input corresponds to for state use */}
                <FormGroup className="m-5">
                  <Label>Name</Label>
                  <Input
                    id="name"
                    name="Name"
                    placeholder="Name"
                    value={Name}
                    onChange={handleFormFieldChange}
                  />
                </FormGroup>
               
                <FormGroup className="m-5">
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Email"
                    value={email}
                    onChange={handleFormFieldChange}
                  />
                </FormGroup>
                <FormGroup className="m-5">
                  <Label for="SetPassword">Create Password</Label>
                  <Input
                    type="password"
                    name="setPassword"
                    id="setPassword"
                    placeholder="Set password "
                    value={setPassword}
                    onChange={handleFormFieldChange}
                  />
                </FormGroup>
                <FormGroup className="m-5">
                  <Label for="ConfirmPassword">Confirm Password</Label>
                  <Input
                    type="password"
                    name="ConfirmPassword"
                    id="ConfirmPassword"
                    placeholder=" Confirm password "
                    value={ConfirmPassword}
                    onChange={handleFormFieldChange}
                  />
                </FormGroup>
              </Form>
              <div className=" justify-content-center d-flex">
                <Row>
                  <Button
                    className="button-signin mt-4"
                    onClick={handleFormSubmit}
                  >
                    Create Account
                  </Button>
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
