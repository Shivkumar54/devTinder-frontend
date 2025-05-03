import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailID] = useState("shiv1@gmail.com");
  const [password, setPassword] = useState("Shiv@12345");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatcher(addUser(res?.data));
      navigate("/");
      setEmailID("");
      setPassword("");
    } catch (err) {
      setErrorMessage(err?.response?.data);
    }
  };

  const handleForm = () => {
    setIsLogin((prevState) => setIsLogin(!prevState));
  };

  return (
    <div className="h-[80vh] flex justify-center items-center align-middle ">
      <div className="card bg-base-300 w-[30rem] p-10 shadow-sm ">
        <div className="card-body">
          <h4 className="text-3xl font-extrabold">
            Hey developer 👋 <br />
          </h4>
          <p className="text-sm font-medium">Please leave your Creds here</p>
          <div className="form mt-4">
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailID(e.target.value)}
              className=" border-2 outline-none py-3 my-2 w-full border-gray-600 rounded-md indent-2 text-base"
              placeholder="Enter your Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" border-2 outline-none py-3 my-2 w-full border-gray-600 rounded-md indent-2 text-base"
              placeholder="Enter your Password"
            />
            <div className="error">
              <h5 className="text-red-400 font-semibold">{errorMessage}</h5>
            </div>
          </div>
          <div className="card-actions justify-start mt-3 mb-5">
            <button
              className="btn btn-primary font-extrabold tracking-wider w-full uppercase "
              onClick={handleLogin}
            >
              {isLogin ? "Login Now" : "Sign Up"}
            </button>
          </div>
          <hr className="text-gray-600" />
          <div className="div text-center mt-5">
            <span className="text-sm">
              {!isLogin ? "Already a User" : "New to the application? "}
            </span>
            <h4
              onClick={handleForm}
              className="mt-2 font-semibold underline cursor-pointer"
            >
              Click here to {isLogin ? "Sign Up" : "Login "}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
