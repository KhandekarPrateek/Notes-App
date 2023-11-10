import React from "react";

const UserInfo = (props) => {
  return (
    <div className="mb-5">
      <h4 className="mx-5 my-1">{props.title}</h4>
      <div className="border border-1 d-flex mx-5">{props.info}</div>
    </div>
  );
};

export default UserInfo;
