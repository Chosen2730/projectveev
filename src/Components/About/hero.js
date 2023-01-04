import React from "react";
import about from "../../images/about.png";

const Hero = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      <div>
        <h2 className='text-xl font-bold'>ABOUT US </h2>
        <p className='my-3'>
          VEEV CLOTHIERS is a luxurious, yet affordable African fashion brand
          caters for the fashion needs of both genders of all ages. We
          specialize in the sale of quality Ready-to-wear outfits of various
          designs, sale of fabric and bespoke tailoring (custom orders) for
          special occasion needs.
        </p>
        <p className='my-3'>
          We are a branded fashion company that specialises in
        </p>
        <div className='ml-4'>
          <li className='list-disc my-3'>Ready to wear outfits</li>
          <li className='list-disc my-3'>Sales of Fabrics</li>
          <li className='list-disc my-3'>Bespoke Tailoring</li>
          <li className='list-disc my-3'>Clothing Accessories</li>
        </div>
        <p className='my-3'>
          We make luxury affordable for men, women and Kids and we are committed
          to make you stand out fashionably For enquires Kindly DM/WHATSAPP
          08067891075 <br />
          <br /> WE DELIVER WORLDWIDE
        </p>
      </div>
      <img src={about} alt='hero' />
    </div>
  );
};

export default Hero;
