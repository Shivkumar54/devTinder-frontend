import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../store/slices/connectionSlice";
import ConnectionCard from "../Common/ConnectionCard";
import NoConnections from "../Common/NoConnections";

const Connections = () => {
  const dispatch = useDispatch();
  let data = useSelector((store) => store.connection);
  //   data = [];

  const userConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.log(err?.response?.data);
    }
  };
  useEffect(() => {
    userConnections();
  }, []);
  return (
    <div className=" flex flex-col items-center gap-3 justify-center">
      <h1 className="text-xl uppercase tracking-widest font-semibold text-gray-500 my-4">
        My friend Connections
      </h1>
      {data?.length ? (
        data?.map((item) => (
          <div className="w-full max-w-xl" key={item?._id}>
            <ConnectionCard data={item} />
          </div>
        ))
      ) : (
        <NoConnections message="No Connection Request Found" />
      )}
    </div>
  );
};

export default Connections;
