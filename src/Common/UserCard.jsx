import React from "react";
import { BASE_URL, DEFAULT_IMAGE } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../store/slices/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, gender, skills, about, age } =
    user;

  const dispatch = useDispatch();

  const handleRequestChange = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      console.log(res?.data);
      dispatch(removeFeed(_id));
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure className="h-80 w-full object-contain">
          <img
            alt="Tailwind CSS Navbar component"
            className=" h-full w-full object-cover"
            src={photoUrl}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>
            <span className="capitalize ">{gender ? gender : "NA"}</span> ||{" "}
            {age ? age : "NA"}
          </p>
          <p></p>
          <p>{about}</p>

          <div className="card-actions justify-center mt-4">
            <button
              onClick={() => handleRequestChange("ignored", _id)}
              className="btn bg-red-500 w-36 "
            >
              <strong>Ignored</strong>
            </button>
            <button
              onClick={() => handleRequestChange("interested", _id)}
              className="btn bg-blue-500 w-36 "
            >
              <strong>Interested</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
