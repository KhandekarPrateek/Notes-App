import React from "react";

const UserInfo = (props) => {
  return (
    <div className="my-5">
      <h4>{props.title}</h4>
      <div className="border border-1 d-flex p-2">{props.info}</div>
    </div>
  );
};

export default UserInfo;
