import React, { useEffect, useState } from "react";
import { FaUsers, FaUsersSlash } from "react-icons/fa";
import { RiLuggageCartFill } from "react-icons/ri";
import { SlNote } from "react-icons/sl";
import { useSelector } from "react-redux";
import { getUsers, updateUserStatus } from "../../Utils/functions";
import { ImUsers } from "react-icons/im";

const Users = () => {
  const {
    isLoggedIn,
    user: { uid },
  } = useSelector((state) => state.auth);

  const [allUsers, setAllUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [limit, setLimit] = useState(20);
  const [lastVisibleItem, setLastVisibleItem] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getUsers(limit);
      setAllUsers(res.data);
      setActiveUsers(res.data.filter((user) => user.blocked === false));
      setBlockedUsers(res.data.filter((user) => user.blocked === true));
      setLastVisibleItem(res.lastVisibleItem);
    };
    fetch();
  }, [limit]);
  // console.log({activeUsers, blockedUsers});

  const updateStatus = async () => {
    var userStatus = false;
    await updateUserStatus(uid, userStatus);
  };

  // console.log({ allUsers });
  const userHeader = ["Name", "Email", "Tel", "Status", "Actions"];
  return (
    <div className='p-4'>
      <h2 className='font-bold text-2xl'>Users</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 my-10'>
        <div className='rounded-xl shadow-xl bg-black text-white p-8'>
          <div className='flex justify-between gap-2 items-center'>
            <p className='text-lg font-medium my-2'>All Users</p>
            <i className='bg-white text-black text-2xl w-8 rounded-md h-8 flex items-center justify-center'>
              <FaUsers />
            </i>
          </div>
          <p className='text-4xl font-medium'>{allUsers?.length}</p>
        </div>
        <div className='rounded-xl shadow-xl bg-blue-800 text-white p-8'>
          <div className='flex justify-between gap-2 items-center'>
            <p className='text-lg font-medium my-2'>Active Users</p>
            <i className='bg-white text-blue-800 text-2xl w-8 rounded-md h-8 flex items-center justify-center'>
              <ImUsers />
            </i>
          </div>
          <p className='text-4xl font-medium'>{activeUsers?.length}</p>
        </div>
        <div className='rounded-xl shadow-xl bg-red-800 text-white p-8'>
          <div className='flex justify-between gap-2 items-center'>
            <p className='text-lg font-medium my-2'>Blocked Users</p>
            <i className='bg-white text-red-800 text-2xl w-8 rounded-md h-8 flex items-center justify-center'>
              <FaUsersSlash />
            </i>
          </div>
          <p className='text-4xl font-medium'>{blockedUsers.length}</p>
        </div>
      </div>
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
