import React from "react";

const InternetMssg = ({ online }) => {
  console.log("intenet mssg");
  if (!online) {
    return (
      <>
        <div className="dashboard-container d-flex justify-content-center align-items-center">
          NO Internet
        </div>
      </>
    );
  }
};

export default InternetMssg;
