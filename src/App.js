import { Route, Routes } from "react-router";
import "./App.css";
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
          <Route path="/dashboard/:displayName" element={<DashBoard />} />
          <Route path="/profile/:displayName" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
