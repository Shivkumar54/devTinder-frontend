import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, DEFAULT_IMAGE } from "../utils/constants.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../store/slices/userSlice.jsx";

const Navbar = () => {
  const userDetails = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-neutral shadow-sm my-2 top-0 fixed">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-lg font-bold ">
          👋 Dev tINDER
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        {userDetails && (
          <h5 className="text-sm">
            Welcome, <strong>{userDetails?.firstName}</strong>
          </h5>
        )}
        <div className="dropdown dropdown-end mx-6">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {userDetails && (
              <div className="w-8 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    userDetails?.photoUrl
                      ? userDetails?.photoUrl
                      : DEFAULT_IMAGE
                  }
                />
              </div>
            )}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-30 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connections" className="justify-between">
                Connections
              </Link>
            </li>
            <li>
              <Link to="/request" className="justify-between">
                Request
              </Link>
            </li>
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
