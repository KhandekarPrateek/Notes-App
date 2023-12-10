import React, { useContext } from "react";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromUserAuth,
} from "../../../utils/firebase/firebase";
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
import { ThemeContext } from "../../../utils/ThemeContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const defaultFormField = {
    Name: "",
    surname: "",
    email: "",
    setPassword: "",
    ConfirmPassword: "",
  };
  const [formField, setFormField] = useState(defaultFormField);
  const { Name, surname, email, setPassword, ConfirmPassword } = formField;
  // NOtes:the value and state are circular i.e if value changes state changes and state change tells what to display

  const clearFormFields = () => {
    setFormField(defaultFormField);
  };
  const handleFormFieldChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (setPassword !== ConfirmPassword) {
      toast.error("passwords donot match", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        setPassword
      );
      await createUserDocumentFromUserAuth(user, { Name });
      toast.success("Sign Up successful", {
        position: toast.POSITION.TOP_RIGHT,
      });
      routeTosignIn();
      clearFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.warning("cannot create account with same email!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        console.log(error, "user creation unsucessful");
      }
    }
  };
  const navigate = useNavigate();
  const routeTosignIn = () => {
    navigate("/signin");
  };
  const [{ theme }] = useContext(ThemeContext);
  const styles = {
    backgroundColor: theme.backgroundColor,
    color: theme.color,
  };
  return (
    <Container className="container-signin" fluid style={styles}>
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
                    style={styles}
                    id="name"
                    name="Name"
                    placeholder="Name"
                    value={Name}
                    onChange={handleFormFieldChange}
                  />
                </FormGroup>
                <FormGroup className="m-5">
                  <Label>Surname</Label>
                  <Input
                    style={styles}
                    id="surname"
                    name="surname"
                    placeholder="Surname"
                    value={surname}
                    onChange={handleFormFieldChange}
                  />
                </FormGroup>
                <FormGroup className="m-5">
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    style={styles}
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
                    style={styles}
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
                    style={styles}
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
          style={styles}
        >
          <img src={displaySignIn} alt="sign-in-photo" />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
