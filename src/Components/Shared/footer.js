import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo2.png";
import fb from "../../images/fb.png";
import tw from "../../images/tw.png";
import ig from "../../images/ig.png";
import wt from "../../images/wt.png";

const Footer = () => {
  return (
    <footer className='bg-black p-8 text-gray-200 pb-32'>
      <img src={logo} className='w-52' alt='logo' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 my-8'>
        <div className=''>
          <p className='text-xs'>
            ADDRESS:{" "}
            <span className='font-medium'>
              3rd floor, Glory house, 30 adatan road opposite St. Peter & Paul
              Cathedral, Isale Ake Abeokuta. Ogun State, Nigeria.
            </span>
          </p>
          <p className='text-xs my-3'>
            EMAIL:
            <span className='font-medium'> info@veevclothiers.com</span>
          </p>
          <p className='text-xs'>
            Contact:
            <span className='font-medium'>
              +2349039878244 | +23480678 91075 | +1(587)-429-3786
            </span>
          </p>
          <div className='flex items-center gap-3 my-5'>
            <img src={ig} className='w-8' alt='ig' />
            <img src={tw} className='w-8' alt='tw' />
            <img src={fb} className='w-8' alt='fb' />
          </div>
        </div>
        <div>
          <h2 className='uppercase'>Information</h2>
          <div className='flex flex-col gap-2 my-4 text-xs'>
            <Link to=''>Delivery Information</Link>
            <Link to=''>Order and Return Policy</Link>
            <Link to='privacy-policy'>Privacy Policy</Link>
            <Link to='terms'>Terms and Conditions</Link>
          </div>
        </div>
      </div>
      <p className='font-medium text-xs my-4 text-center'>
        © {new Date().getFullYear()} VEEV CLOTHEIRS - All Right reserved!
      </p>
      <a href='https://wa.me/message/GCZSV3CRNB6SI1' target={"__blank"}>
        <div className='flex gap-2 items-center bg-black rounded-full px-8 p-4 text-white fixed bottom-10 right-4 text-sm capitalize'>
          <h2>Chat with us</h2>
          <img src={wt} alt='whatsapp' className='w-12' />
        </div>
      </a>
    </footer>
  );
};

export default Footer;
