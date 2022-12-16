import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalAmount } from "../Redux/features/productSlice";
import { PaystackButton } from "react-paystack";
import { addOrder } from "../Utils/functions";
import { info } from "autoprefixer";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Information from "../Components/Checkout/information";
import Payment from "../Components/Checkout/payment";
import Shipping from "../Components/Checkout/shipping";
import Currency from "../Components/Configs/currency";

const Checkout = () => {
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
  const stages = ["information", "shipping", "payment"];
  const [selected, setSelected] = useState(0);
  const nextCheck = () => {
    if (selected < stages.length - 1) {
    } else {
    }
    setSelected((oldState) => {
      const newState = oldState + 1;
      if (newState > 2) {
        return 2;
      } else return newState;
    });
  };
  const [informationDetails, setInformationDetails] = useState({});

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
  const handleInputChange = (e) => {
    setInformationDetails({
      ...informationDetails,
      [e.target.name]: e.target.value,
    });
    console.log(informationDetails);
  };

  return (
    <div className='flex flex-col md:flex-row gap-8 p-4 md:p-8'>
      <div className='md:w-[65%]'>
        <h1 className='uppercase font-medium text-xl'>Checkout</h1>
        <div className='flex flex-col md:flex-row gap-3 my-10 md:items-center'>
          <h1 className='uppercase font-medium'>
            Bag ({cartItems.length} items)
          </h1>
          <div className='flex items-center gap-2'>
            {stages.map((item, i) => {
              return (
                <div key={i} className='flex gap-2 items-center'>
                  <i className='text-sm p-1 rounded-full bg-gray-100'>
                    <AiOutlineArrowRight />
                  </i>
                  <h1
                    className={`${
                      selected === i ? "font-bold" : "font-normal"
                    } uppercase cursor-pointer text-xs md:text-sm`}
                    onClick={() => setSelected(i)}
                  >
                    {item}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
        {selected === 0 ? (
          <Information
            informationDetails={informationDetails}
            setInformationDetails={setInformationDetails}
            handleInputChange={handleInputChange}
          />
        ) : selected === 1 ? (
          <Shipping
            informationDetails={informationDetails}
            setInformationDetails={setInformationDetails}
            handleInputChange={handleInputChange}
          />
        ) : (
          <Payment
            informationDetails={informationDetails}
            setInformationDetails={setInformationDetails}
            handleInputChange={handleInputChange}
          />
        )}
        <div className='flex items-center justify-between'>
          {selected < stages.length - 1 && (
            <div className='flex gap-2 items-center'>
              <i className='text-sm p-1 rounded-full bg-gray-300 text-white'>
                <AiOutlineArrowLeft />
              </i>
              <h1 className='font-normal uppercase'>Back to bag</h1>
            </div>
          )}
          {selected < stages.length - 1 ? (
            <button
              className='bg-black text-white p-4 px-12 rounded-full hover:scale-105 transition hover:text-gray-200'
              onClick={nextCheck}
            >
              Next
            </button>
          ) : (
            <PaystackButton
              className='bg-black p-4 rounded-md text-white w-full hover:scale-95 hover:bg-gray-600'
              {...componentProps}
            />
          )}
        </div>
      </div>
      <div className='md:w-[35%]'>
        <h1 className='uppercase font-medium text-xl'>Order summary</h1>
        <div className='border-b-2'>
          {cartItems.map(({ img, item, itemTotal, qty }, id) => {
            return (
              <div
                key={id}
                className='flex my-4 items-center gap-4 p-4 bg-gray-50 rounded-md shadow-xl shadow-gray-100 relative'
              >
                <img className='w-20 h-20 object-cover' src={img} alt={item} />
                <div>
                  <h2 className='text-sm'>{item}</h2>
                  <span className='my-4'>Qty: {qty}</span>
                  <h2 className='font-medium'>Subtotal: </h2>
                  <Currency
                    className='inline-block text-sm font-bold '
                    amount={itemTotal}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className='border-b-2 bg-gray-50 shadow-md p-4'>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg my-4'>Sub Total: </h2>
            <span className='text-lg font-medium'>
              <Currency className='inline-flex' amount={totalAmount} />
            </span>{" "}
          </div>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg my-4'>Delivery Fee: </h2>
            <span className='text-lg font-medium'>
              <Currency className='inline-flex' amount={500} />
            </span>{" "}
          </div>
        </div>
        <div className='border-b-2 bg-gray-50 shadow-md p-4'>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg my-4'>Grand Total: </h2>
            <span className='text-lg font-bold'>
              <Currency className='inline-flex' amount={totalAmount + 500} />
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
