import React from "react";
import reqImg from "../assets/request.svg";

const NoConnections = ({ message }) => {
  return (
    <div className="text-center">
      <img src={reqImg} alt="NoConnections" className="w-96 h-96" />
      <h1 className="text-2xl font-bold text-gray-500">{message}</h1>
    </div>
  );
};

export default NoConnections;
