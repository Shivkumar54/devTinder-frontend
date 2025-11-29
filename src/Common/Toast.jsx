import React from "react";
import { Saved } from "../assets/svgs";

const Toast = ({message}) => {
  return (
    <div>
      <div className="toast toast-top toast-center top-10 z-50">
        <div className="alert alert-success bg-green-600">
          <h4 className="font-semibold text-white text-base flex justify-center items-center gap-3">
            {Saved} {message}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Toast;
