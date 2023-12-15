import { Route, Routes } from "react-router";
import "./App.css";
import SignIn from "./pages/OnboardPage/SignIn";
import SignUp from "./pages/OnboardPage/SignUp";
import DashBoard from "./pages/DashBoard";
import Profile from "./pages/Profile";
import NotesName from "./pages/DashBoard/NotesName";
import { ToastContainer } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./utils/ThemeContext";
import { Helmet } from "react-helmet";
function App() {
  const [{ isDark }] = useContext(ThemeContext);

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href={`/css/styles/${isDark ? "dark" : "light"}Theme.css`}
        />
      </Helmet>

      <div>
        <ToastContainer />
        <Routes>
          <Route path="/">
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="dashboard/:displayName" element={<DashBoard />}>
              <Route path=":noteUUID" element={<NotesName />} />
            </Route>
            <Route path="profile/:displayName" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
