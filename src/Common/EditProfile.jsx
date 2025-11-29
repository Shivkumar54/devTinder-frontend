import React, { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../store/slices/userSlice";
import Toast from "./Toast";

const EditProfile = ({ user }) => {
  const dispatcher = useDispatch();
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [save, setSave] = useState(false);
  const [age, setAge] = useState(user?.age);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          gender,
          about,
          age,
          photoUrl,
        },
        { withCredentials: true }
      );

      dispatcher(addUser(res.data.data));
      setSave(true);
      setTimeout(() => {
        setSave(false);
      }, 3000);
    } catch (err) {
      console.log(err?.response?.data);
      setErrorMessage(err?.response?.data);
    }
  };

  return (
    <>
      {save && <Toast message="Profile Updated Successfully." />}
      <div className="w-[60rem] flex justify-center items-center gap-12 scroll-auto">
        <div className="form w-full">
          <h1 className="text-2xl font-bold mb-3">Update Details</h1>
          <form>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className=" border-2 outline-none py-3 my-1 w-full border-gray-700 rounded-md indent-4 text-sm"
              placeholder="Last Name: Cena"
            />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className=" border-2 outline-none py-3 my-1 w-full border-gray-700 rounded-md indent-4 text-sm"
              placeholder="Last Name: Cena"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className=" border-2 outline-none py-3 my-1 w-full border-gray-700 rounded-md indent-4 text-sm"
              placeholder="Last Name: Cena"
            />
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className=" border-2 outline-none py-3 my-1 w-full border-gray-700 rounded-md indent-4 text-sm"
              placeholder="Age: 24"
            />
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value.toLowerCase())}
              className=" border-2 outline-none py-3 my-1 w-full border-gray-700 rounded-md indent-4 text-sm"
              placeholder="Gender: male"
            />
            <textarea
              type="text"
              rows="5"
              cols="10"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className=" border-2 outline-none py-3 my-1 w-full border-gray-700 rounded-md px-4 text-sm"
              placeholder="Last Name: Cena"
            ></textarea>
            <h4 className="text-red-500 font-bold mt-2">{errorMessage}</h4>
            <button
              onClick={handleUpdate}
              className="bg-blue-500 h-10 text-base w-48 font-extrabold shadow rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="userCard w-full">
          <UserCard
            user={{ firstName, lastName, gender, about, age, photoUrl }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
