import React, { useState, useEffect } from "react";
import InternetMssg from "./InternetMssg";
import { useLocation, useNavigate } from "react-router";

const CheckInternet = ({ isOnlineRef }) => {
  const [isOnline, setIsOnline] = useState(isOnlineRef.current);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      if (online) {
        const storedData = localStorage.getItem("userInfo");
        const parsedData = JSON.parse(storedData);
        const isOnDashboard = location.pathname.startsWith("/dashboard");
        if (parsedData && !isOnDashboard) {
          navigate(`/dashboard/${parsedData}`);
        }
      }
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, [isOnlineRef, navigate, location.pathname]);
  return (
    <div>
      {isOnline ? (
        <>
          <InternetMssg online={true} />
        </>
      ) : (
        <InternetMssg online={false} />
      )}
    </div>
  );
};

export default CheckInternet;
