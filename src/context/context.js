import { useState } from "react";
import { createContext } from "react";

//as the actual value i want to access or can be said as the inital value of context
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});
export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); //intial value of state
  const value = { currentUser, setCurrentUser };
  //this value is the data that we want to be able to access from all wrapped children
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
  //this .provider  method is for every context that gets build and
  // it wraps around for every component that needs access to the context
};
