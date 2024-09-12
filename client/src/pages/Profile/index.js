import React, { useEffect, useState } from "react";
import { Col, Form, Row, FormGroup, Label, Input, Button } from "reactstrap";
import profile from "../../assets/profile.png";
import NavigationBar from "../../common/NavigationBar";
import UserInfo from "./UserInfo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../common/Loader";
const Profile = () => {
 
  const [loading, setLoading] = useState(false);
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

  const handlePasswordChange = async () => {
    if (setPassword === confirmPassword) {
      setLoading(true);
      try {
        const response = await fetch('https://notes-app-gilt-chi.vercel.app/notes', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          },
          body: JSON.stringify({ newPassword: setPassword }),
        });

        if (response.ok) {
          toast.success("Password updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.message || 'Failed to update password'}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        toast.error("An unexpected error occurred", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Passwords do not match", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };


  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Row className="profile-container">
            <NavigationBar />
            <Col sm={6} className="d-flex align-items-center ">
              <img src={profile} alt="profile-image" />{" "}
            </Col>
            <Col sm={6}>
              {" "}
              <Row>
                <h3 className="my-5">Your Profile</h3>
                <UserInfo info="Name" title={"Name"} />
                <UserInfo info="email" title={"Email"} />

                <Form>
                  <h3 className="my-5">Change password</h3>

                  <FormGroup className="my-5">
                    <Label for="setPassword">Create Password</Label>
                    <Input
                      type="password"
                      name="setPassword"
                      id="SetPassword"
                      placeholder="Set password "
                      onChange={handlePasswordChangeSignIn}
                    />
                  </FormGroup>
                  <FormGroup className="my-5">
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
                    className=" button-signin my-5 d-flex justify-content-center align-items-center"
                    onClick={handlePasswordChange}
                  >
                    Update
                  </Button>
                </Form>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Profile;
