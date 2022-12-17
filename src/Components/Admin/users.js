import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUsers } from "../../Utils/functions";

const Users = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [allUsers, setAllUsers] = useState([])
  const [limit, setLimit] = useState(20)
  const [lastVisibleItem, setLastVisibleItem] = useState()

  useEffect(() => {
    const fetch = async () => {
      const res = await getUsers(limit);
      setAllUsers(res.data);
      setLastVisibleItem(res.lastVisibleItem);
    }
    fetch()
  }, [limit])

  console.log({allUsers});
  
  return <div>Users</div>;
};

export default Users;
