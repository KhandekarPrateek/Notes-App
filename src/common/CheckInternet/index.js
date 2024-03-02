import React, { useState, useEffect } from "react";
import InternetMssg from "./InternetMssg";

const CheckInternet = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  return (
    <div>
      {isOnline ? (
        <InternetMssg online={true} message="Connected To Internet" />
      ) : (
        <InternetMssg online={false} message="No Internet available" />
      )}
    </div>
  );
};

export default CheckInternet;
