import React from "react";
import { Accept, Chat, Reject } from "../assets/svgs";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../store/slices/requestSlice";

const ConnectionCard = ({ data }) => {

  const { _id, firstName, lastName, photoUrl, gender, age, about } = data;

  const isConnection = location.href.includes("connections");
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <div className="flex items-center gap-5 w-full bg-base-300 p-6 rounded-xl shadow-md shadow-gray-800">
        <div className=" w-2/12 h-20">
          <img
            src={photoUrl}
            alt="Phoro_Url"
            className=" w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="img w-8/12">
          <h1 className="text-lg font-bold">{firstName + " " + lastName}</h1>
          <p className="text-sm truncate text-gray-400 my-1">{about}</p>
          <h4 className="flex capitalize font-bold">
            {age} {gender}
          </h4>
          {!isConnection && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => reviewRequest("accepted", _id)}
                className="w-32 h-10 bg-green-600 text-black flex justify-center items-center gap-1 font-extrabold rounded-md text-sm cursor-pointer uppercase "
              >
                {Accept} Accept
              </button>
              <button
                onClick={() => reviewRequest("accepted", _id)}
                className="w-32 h-10 border border-gray-600 text-gray-500 flex justify-center items-center gap-1 font-bold rounded-md text-sm cursor-pointer uppercase"
              >
                {Reject} Reject
              </button>
            </div>
          )}
        </div>
        <div className="messgae">{isConnection && <h4>{Chat}</h4>}</div>
      </div>
    </>
  );
};

export default ConnectionCard;
