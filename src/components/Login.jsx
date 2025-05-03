import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { HidePassword, ShowPassword } from "../assets/svgs";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signUp",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatcher(addUser(res?.data?.data));
      navigate("/profile");
      setFirstName("");
      setLastName("");
      setEmailID("");
      setPassword("");
    } catch (err) {
      setErrorMessage(err?.response?.data);
    }
  };

  const handleForm = () => {
    setIsLogin((prevState) => !prevState);
  };
  const handlePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const icon = ShowPassword;
  const hIcon = HidePassword;

  return (
    <div className="h-[80vh] flex justify-center items-center align-middle ">
      <div className="card bg-base-300 w-[30rem] h-[77vh] p-10 shadow-sm ">
        <div className="flex w-full h-full justify-center gap-24 items-center">
          <div className="form w-full">
            <h4 className="text-2xl font-bold mb-4">
              {isLogin ? "Login In" : "Sign Up"} <br />
            </h4>
            {!isLogin && (
              <>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className=" border-2 outline-none py-3 my-2 w-full border-gray-700 rounded-md indent-4 text-sm"
                  placeholder="First Name: John"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className=" border-2 outline-none py-3 my-2 w-full border-gray-700 rounded-md indent-4 text-sm"
                  placeholder="Last Name: Cena"
                />
              </>
            )}
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailID(e.target.value)}
              className=" border-2 outline-none py-3 my-2 w-full border-gray-700 rounded-md indent-4 text-sm"
              placeholder="Email: john@gmail.com"
            />
            <div className="dib relative">
              <h4
                onClick={handlePassword}
                className="absolute top-5 right-5 cursor-pointer"
              >
                {showPassword ? icon : hIcon}
              </h4>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" border-2 outline-none py-3 my-2 w-full border-gray-700 rounded-md indent-4 text-sm"
                placeholder="Password"
              />
            </div>

            <div className="error">
              <h5 className="text-red-400 font-semibold">{errorMessage}</h5>
            </div>
            <div className="card-actions justify-start mt-4 mb-12">
              <button
                className="btn btn-primary font-extrabold tracking-wider w-full uppercase "
                onClick={isLogin ? handleLogin : handleSignUp}
              >
                {isLogin ? "Login Now" : "Sign Up"}
              </button>
            </div>
            <hr className="text-gray-700 my-5" />
            <div className="div text-center">
              <span className="text-xs text-gray-300">
                {!isLogin ? "Already a User" : "New to the application? "}
              </span>
              <h4
                onClick={handleForm}
                className="mt-2 text-sm font-medium capitalize underline cursor-pointer"
              >
                Click here to {isLogin ? "Sign Up" : "Login "}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
