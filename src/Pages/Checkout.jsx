import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getTotalAmount } from "../Redux/features/productSlice";
import { addOrder } from "../Utils/functions";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Information from "../Components/Checkout/information";
import Payment from "../Components/Checkout/payment";
import Shipping from "../Components/Checkout/shipping";
import Currency from "../Components/Configs/currency";
import { removeItem } from "../Redux/features/productSlice";
import { useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { PayPalButtons } from "@paypal/react-paypal-js";
import pay from "../images/pay.png";
import { BsPaypal } from "react-icons/bs";
import { AiOutlineCreditCard } from "react-icons/ai";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const stages = ["information", "shipping", "payment"];
  const [selected, setSelected] = useState(0);
  const [informationDetails, setInformationDetails] = useState({});
  const [deliveryFee, setDeliveryFee] = useState(0);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const disPatcha = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useSelector((state) => state.product);
  const [userDetails, setUserDetails] = useState(Object);
  const grandTotal = totalAmount + deliveryFee;
  const {
    isLoggedIn,
    user,
    user: { uid, name, admin, email, phoneNumber },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    disPatcha(getTotalAmount());
  }, [cartItems, disPatcha]);

  useEffect(() => {
    if (isLoggedIn) {
      setUserDetails({
        name: name,
        email: email,
        phone: phoneNumber,
      });
    }
  }, [email, isLoggedIn, name, phoneNumber]);
  const formatTotalAmount = (amount) => {
    return amount * 100;
  };

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalAmount.toString(),
          },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      const name = details.payer.name.given_name;
      const message = details.status === "COMPLETED" && "Approved";
      const status = details.status === "COMPLETED" && "success";
      const trxref = details.id;
      await handleSuccess(message, status, trxref);
    });
  };

  const handleSuccess = async (message, status, trxref) => {
    if (user) {
      const data = {
        message,
        status,
        trxref,
        uid,
        cartItems,
        orderStatus: "pending",
        name,
        email: informationDetails.email,
        admin,
        shippingAddress: informationDetails.address,
        phone: informationDetails.tel,
      };
      await addOrder(isLoggedIn, data);

      cartItems.forEach((item) => {
        if (item.productId) {
          disPatcha(removeItem({ id: item.productId }));
        }
        alert("Thanks for doing business with us! Come back soon!!");
        navigate("/orders");
      });
    }
  };

  const nextCheck = () => {
    setSelected((oldState) => {
      const newState = oldState + 1;
      if (newState > 2) {
        return 2;
      } else return newState;
    });
  };

  const publicKey = "pk_test_24ddae0d0c49925a3937ab60331bcc4f3d594c52";

  const componentProps = {
    email: informationDetails.email,
    amount: formatTotalAmount(grandTotal),
    metadata: {
      name: userDetails.name,
      phone: userDetails.phone,
    },
    publicKey,
    text: "Pay Now",
    // onSuccess: handleSuccess,
    onSuccess: (ref) => {
      const message = ref.message;
      const status = ref.status;
      const trxref = ref.trxref;
      handleSuccess(message, status, trxref);
      navigate("/orders");
      dispatch(clearCart());
    },
    onClose: () => alert("Wait! You need those orders, don't go!!!!"),
  };
  const regions = [
    { region: "Select", deliveryFee: 0 },
    { region: "Abeokuta", deliveryFee: 1000 },
    { region: "Ogun State", deliveryFee: 3000 },
    { region: "Obada", deliveryFee: 2000 },
    { region: "Lagos State", deliveryFee: 3500 },
    { region: "Ibadan", deliveryFee: 3500 },
    { region: "SouthWest Nigeria", deliveryFee: 4000 },
    { region: "Rivers State", deliveryFee: 4000 },
    { region: "Delta State", deliveryFee: 4000 },
    { region: "South East Nigeria", deliveryFee: 4000 },
    { region: "Abuja", deliveryFee: 4500 },
    { region: "USA", deliveryFee: 20000 },
    { region: "Canada", deliveryFee: 20000 },
    { region: "UK", deliveryFee: 15000 },
  ];
  const handleInputChange = (e) => {
    setInformationDetails({
      ...informationDetails,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    regions.forEach((element) => {
      if (element.region === informationDetails.region) {
        setDeliveryFee(element.deliveryFee);
      }
    });
  }, [informationDetails]);

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
            regions={regions}
          />
        ) : selected === 1 ? (
          <Shipping
            informationDetails={informationDetails}
            setInformationDetails={setInformationDetails}
            handleInputChange={handleInputChange}
            deliveryFee={deliveryFee}
          />
        ) : (
          <Payment
            informationDetails={informationDetails}
            setInformationDetails={setInformationDetails}
            handleInputChange={handleInputChange}
            deliveryFee={deliveryFee}
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
            <div className='flex flex-col'>
              <div className=''>
                <h2 className='uppercase text-sm mt-8 font-bold'>
                  Payment Method
                </h2>
                <p className='text-sm my-3'>
                  All transactions are secure and encrypted.
                </p>
                <p className='text-sm my-3'>
                  How do you want to place your order?
                </p>
                <div className='flex flex-col lg:flex-row sm:items-center my-10 gap-4 border p-3'>
                  <img
                    src={pay}
                    className='w-72 p-2 '
                    alt='payment_method'
                    id='paystackBtn'
                    onClick={() => {
                      document
                        .getElementById("paystackBtn")
                        .classList.add("border", "border-black");
                      document
                        .getElementById("paypalBtn")
                        .classList.remove("border", "border-black");
                      setPaymentMethod("paystack");
                    }}
                  />
                  <div>
                    <h2 className='md:text-center'>Select Payment Method</h2>
                    <div className='flex my-4 items-center gap-4'>
                      <button
                        id='paypalBtn'
                        onClick={() => {
                          document
                            .getElementById("paypalBtn")
                            .classList.add("border", "border-black");
                          document
                            .getElementById("paystackBtn")
                            .classList.remove("border", "border-black");
                          setPaymentMethod("paypal");
                        }}
                        className='flex items-center gap-2 bg-blue-800 p-4 rounded-md text-white w-fit h-fit hover:scale-95 hover:bg-gray-600 cursor-pointer'
                      >
                        <BsPaypal className='text-xl' /> PayPal
                      </button>
                      <div className='flex items-center gap-2 bg-black p-4 rounded-md text-white w-fit h-fit hover:scale-95 hover:bg-gray-600 cursor-pointer'>
                        <AiOutlineCreditCard className='text-xl' />
                        <PaystackButton className='' {...componentProps} />
                      </div>
                    </div>
                  </div>
                </div>

                <p className='text-sm my-8'>
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our Privacy Policy
                </p>
              </div>

              {paymentMethod === "paystack" ? (
                ""
              ) : (
                <PayPalButtons
                  style={{ layout: "vertical", label: "pay" }}
                  createOrder={(data, actions) => onCreateOrder(data, actions)}
                  onApprove={(data, actions) => onApproveOrder(data, actions)}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className='md:w-[35%]'>
        <h1 className='uppercase font-medium text-xl'>Order summary</h1>
        <div className='border-b-2'>
          {cartItems.map(({ imageUrl, title, itemTotal, qty }, id) => {
            return (
              <div
                key={id}
                className='flex my-4 items-center gap-4 p-4 bg-gray-50 rounded-md shadow-xl shadow-gray-100 relative'
              >
                <img
                  className='w-20 h-20 object-cover'
                  src={imageUrl}
                  alt={title}
                />
                <div>
                  <h2 className='text-sm'>{title}</h2>
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
              <Currency className='inline-flex' amount={deliveryFee} />
            </span>{" "}
          </div>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg my-4 font-bold'>Grand Total: </h2>
            <span className='text-lg font-medium'>
              <Currency className='inline-flex font-bold' amount={grandTotal} />
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
