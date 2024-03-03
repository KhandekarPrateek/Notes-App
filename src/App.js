import { Route, Routes, useNavigate } from "react-router";
import "./App.css";
import SignIn from "./pages/OnboardPage/SignIn";
import SignUp from "./pages/OnboardPage/SignUp";
import DashBoard from "./pages/DashBoard";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "./utils/ThemeContext";
import { Helmet } from "react-helmet";
import NoteTab from "./pages/DashBoard/NoteTab";
import CheckInternet from "./common/CheckInternet";
function App() {
  const [{ isDark }] = useContext(ThemeContext);
  const isOnlineRef = useRef(navigator.onLine);
  const navigate = useNavigate();
  const navigateToNoNet = () => {
    navigate(`/NoInternet`);
  };

  useEffect(() => {
    const handleOnlineStatus = () => {
      isOnlineRef.current = navigator.onLine;
      if (
        !isOnlineRef.current &&
        !window.location.pathname.includes("/NoInternet")
      ) {
        navigateToNoNet();
      }
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);
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
            <Route
              path="NoInternet"
              element={<CheckInternet isOnlineRef={isOnlineRef} />}
            />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="dashboard/:displayName" element={<DashBoard />}>
              <Route path=":noteUUID" element={<NoteTab />} />
            </Route>
            <Route path="profile/:displayName" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
