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

  // const [DynamicTheme, setDynamicTheme] = useState(
  //   require("./styles/lightTheme2.css")
  // );
  // console.log(DynamicTheme, "DynamicTheme");
  // useEffect(() => {
  //   console.log(isDark, "effect");
  //   if (!isDark) {
  //     console.log(isDark, "if");
  //     setDynamicTheme(require(`./styles/darkTheme.css`));
  //   } else {
  //     console.log(isDark, "else");
  //     setDynamicTheme(require(`./styles/lightTheme2.css`));
  //   }
  // }, [isDark]);
  // useEffect(() => {
  //   console.log(DynamicTheme, "kuwehfkuifuiuf");
  // }, [isDark]);
  // const [reqTheme, setReqTheme] = useState(require(`./styles/lightTheme2.css`));
  const abc = localStorage.getItem("theme");
  // useEffect(() => {
  //   console.log(abc, "abc");
  //   switch (isDark) {
  //     case true:
  //       setReqTheme(require(`../src/styles/darkTheme.css`));
  //       break;
  //     case false:
  //       const abc = require(`../src/styles/lightTheme2.css`);
  //       setReqTheme(abc);
  //       break;
  //     default:
  //       break;
  //   }
  // }, [abc]);
  //   <noscript>{`
  //   <link rel="stylesheet" href={${reqTheme}} />
  // `}</noscript>
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          // href={`styles/${isDark ? "dark" : "light"}Theme.css`}
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
