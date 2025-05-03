import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import NoConnections from "../Common/NoConnections";
import { addRequest } from "../store/slices/requestSlice";
import ConnectionCard from "../Common/ConnectionCard";

const Request = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.request);

  const [reqId, setReqId] = useState("");

  const userRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    userRequest();
  }, []);
  return (
    <div className=" flex flex-col items-center gap-3 justify-center">
      <h1 className="text-xl uppercase tracking-widest font-semibold text-gray-500 my-4">
        My friend Request
      </h1>
      {data?.length ? (
        data?.map((item) => {
          const { firstName, lastName, photoUrl, gender, age, about } =
            item.fromUserId;
          const { _id } = item;

          return (
            <div className="w-full max-w-xl" key={item?._id}>
              <ConnectionCard
                data={{
                  firstName,
                  lastName,
                  photoUrl,
                  gender,
                  age,
                  about,
                  _id,
                }}
              />
            </div>
          );
        })
      ) : (
        <NoConnections message="No Request Found" />
      )}
    </div>
  );
};

export default Request;
