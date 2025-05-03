import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../store/slices/feedSlice";
import UserCard from "../Common/UserCard";
import NoConnections from "../Common/NoConnections";

const Feed = () => {
  const dispatch = useDispatch();
  const [err, setErr] = useState("");
  const feed = useSelector((store) => store?.feed);

  const getFeedData = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      setErr(error?.response);
    }
  };

  useEffect(() => {
    getFeedData();
  }, []);

  // if (
  //   feed?.length <= 0 && (
  //
  //   )
  // )
  return (
    <div>
      {!feed?.length ? (
        <NoConnections message="Looks like you have no request in list" />
      ) : (
        <UserCard user={feed[0]} />
      )}
    </div>
  );
};

export default Feed;
