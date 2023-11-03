import { Route, Routes } from "react-router";
import "./App.css";
import OnboardPage from "./pages/OnboardPage";
import SignIn from "./pages/OnboardPage/SignIn";
import SignUp from "./pages/OnboardPage/SignUp";
import DashBoard from "./pages/DashBoard";
import Profile from "./pages/Profile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
