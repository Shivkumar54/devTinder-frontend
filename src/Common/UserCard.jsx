import React from "react";
import { DEFAULT_IMAGE } from "../utils/constants";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, gender, skills, about, age } = user;

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
            <span className="capitalize ">{gender ? gender : "NA"}</span> || {age ? age : "NA"}
          </p>
          <p></p>
          <p>{about}</p>

          <div className="card-actions justify-center mt-4">
            <button className="btn bg-red-500 w-36 ">
              <strong>Ignored</strong>
            </button>
            <button className="btn bg-blue-500 w-36 ">
              <strong>Interested</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
