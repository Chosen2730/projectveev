import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUsers } from "../../Utils/functions";

const Users = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [allUsers, setAllUsers] = useState([]);
  const [limit, setLimit] = useState(20);
  const [lastVisibleItem, setLastVisibleItem] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getUsers(limit);
      setAllUsers(res.data);
      setLastVisibleItem(res.lastVisibleItem);
    };
    fetch();
  }, [limit]);

  console.log({ allUsers });
  const userHeader = ["Name", "Email", "Tel", "Status", "Actions"];
  return (
    <div>
      <h2 className='font-bold text-2xl'>Users</h2>
      <p className='text-lg font-medium my-2'>All Users</p>
      <div className='overflow-x-scroll'>
        <div className='grid'>
          <div className='grid grid-cols-5 my-5 bg-gray-100 rounded-md p-5 '>
            {userHeader?.map((item, index) => {
              return (
                <h2 className='capitalize font-bold text-base' key={index}>
                  {item}
                </h2>
              );
            })}
          </div>
          <div className=''></div>
        </div>
      </div>
    </div>
  );
};

export default Users;
