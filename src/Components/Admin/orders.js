import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getOrders } from "../../Utils/functions";

const Orders = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [allOrders, setAllOrders] = useState([])
  const [limit, setLimit] = useState(20)
  const [lastVisibleItem, setLastVisibleItem] = useState()

  useEffect(() => {
    const fetch = async () => {
      const res = await getOrders(limit);
      setAllOrders(res.data);
      setLastVisibleItem(res.lastVisibleItem);
    }
    fetch()
  }, [limit])

  console.log(allOrders);

  return (<>
    <div className="">Orders</div>
  </>);
};

export default Orders;
