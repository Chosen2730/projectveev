import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalAmount } from "../Redux/features/productSlice";
import { PaystackButton } from "react-paystack";
import { addOrder } from "../Utils/functions";

export default function Checkout() {
  const [userDetails, setUserDetails] = useState(Object);
  const { cartItems, totalAmount } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getTotalAmount());
  }, [cartItems]);
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      setUserDetails({
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
      });
    }
  }, [user]);
  const formatTotalAmount = (amount) => {
    return amount * 100;
  };

  const publicKey = "pk_test_24ddae0d0c49925a3937ab60331bcc4f3d594c52"; // generate your key and save in env var (after everything is set) this is just a test key anyways.....

  const handleSuccess = async () => {
    const data = {
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phone,
      totalAmount,
      orderItems: cartItems,
    };
    const addOrderRef = await addOrder(isLoggedIn, data);
    console.log(addOrderRef);
    return alert("Thanks for doing business with us! Come back soon!!");
  };

  const componentProps = {
    email: userDetails.email,
    amount: formatTotalAmount(totalAmount),
    metadata: {
      name: userDetails.name,
      phone: userDetails.phone,
    },
    publicKey,
    text: "Pay Now",
    // onSuccess: handleSuccess,
    onSuccess: () => {
      handleSuccess();
    },
    onClose: () => alert("Wait! You need those orders, don't go!!!!"),
  };

  return (
    <div className=''>
      <div className='container'>
        {cartItems.map(({ img, item, price, oldPrice, itemTotal, qty }, id) => {
          return (
            <div className='item'>
              <div className='overlay-effect'></div>
              <img
                className='item-image'
                src={
                  img
                    ? img
                    : "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                }
                alt={item}
              />
              <div className='item-details'>
                <p className='item-details__title'>{item}</p>
                <p className='item-details__amount'>NGN{price}</p>
              </div>
            </div>
          );
        })}
        <div className='checkout'>
          <div className='checkout-form'>
            <div className='checkout-field' style={{ margin: "30px 0" }}>
              <label>Name: </label>
              <input
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
                value={userDetails.name}
                id='name'
                style={{ border: "1px solid", padding: "5px 10px" }}
              />
            </div>
            <div className='checkout-field' style={{ margin: "20px 0" }}>
              <label>Email: </label>
              <input
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                value={userDetails.email}
                id='email'
                style={{ border: "1px solid", padding: "5px 10px" }}
              />
            </div>
            <div className='checkout-field'>
              <label>Phone: </label>
              <input
                onChange={(e) =>
                  setUserDetails({ ...userDetails, phone: e.target.value })
                }
                value={userDetails.phoneNumber}
                id='phone'
                style={{ border: "1px solid", padding: "5px 10px" }}
              />
            </div>
          </div>
          <PaystackButton className='paystack-button' {...componentProps} />
        </div>
      </div>
    </div>
  );
}
