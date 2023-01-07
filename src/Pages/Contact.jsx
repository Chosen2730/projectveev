import React from "react";
import contact from "../images/contact.png";

const Contact = () => {
  return (
    <div>
      <img src={contact} alt='hero' />
      <div className='max-w-4xl mx-auto p-8 shadow-md'>
        <h2 className='font-bold text-xl uppercase'>Contact us</h2>
        <p className='my-3'>
          For more information about our privacy practices, if you have
          questions, or if you would like to make a complaint, please contact us
          <br />
          <br /> by e-mail at info@veevclothiers.com or by mail using the
          details provided below:
          <br />
          <br />
          <strong>Email:</strong> info@veevclothiers.com <br />
          <br />
          <strong>Contact: </strong> +2349039878244 | +23480678 91075 |
          +1(587)-429-3786 Nigeria
          <br />
          <br />
          <strong>IG & FB:</strong> @veevclothiers <br />
          <br />
          <strong>Address: </strong> 3rd floor, Glory house, 30 adatan road
          opposite St. Peter & Paul Cathedral, Isale Ake Abeokuta. Ogun State,
          Nigeria. <br />
          <br />
          <br />
          Last updated: 30-10-2022
        </p>
      </div>
    </div>
  );
};

export default Contact;
