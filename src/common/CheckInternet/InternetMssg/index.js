import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InternetMssg = ({ online, message }) => {
  if (!online) {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export default InternetMssg;
