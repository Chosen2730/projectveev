import React from "react";
import { useEffect } from "react";
import Hero from "../Components/About/hero";
import ceo from "../images/ceo.jpg";

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const management = [
    {
      name: "Mrs Precious Olafare",
      position: "CEO/Creative Director",
      img: ceo,
    },
  ];
  return (
    <div className='max-w-4xl mx-auto p-4'>
      <Hero />
      <div className='my-10'>
        <p className='text-base my-3'>
          Our products are made from varieties of different African prints that
          may sometimes be combined with other types of fabric to reflect our
          creativity and the beautiful possibilities of African fashion. We also
          have Ready-To-Wear outfits made from contemporary and western fabrics
          like crepe, silk, satins and cashmere. <br />
          <br /> Our choice of fabric and quality of finished outfits is
          carefully worked on to always ensure the comfort and safety of our
          customers. In summary, we offer FLEXIBILITY. Our customers can shop
          from our various Ready-to-wear designs (in UK and US sizes), buy
          fabric from us for their choice styles, or bring in their fabric for
          their desired styles. <br />
          <br /> We provide free virtual and in-person consultation services for
          customers whose requests may require specific measurements. Made in
          Nigeria Local and International delivery is available. <br />
          <br />
          <strong>For enquiries</strong>, contact info@........ WhatsApp
          +2348067891075 or +2349039878244
          <br />
          <br /> <strong>Delivery Information:</strong> Delivery within Abeokuta
          takes 1 business day, delivery to Lagos and Ibadan takes 2-3 business
          days. For deliveries outside the above locations but within Nigeria,
          it takes between 3-8 business days. International delivery takes 3-10
          days.
        </p>
      </div>
      <div className='shadow-md rounded-md p-4 my-10'>
        {/* <h2 className='font-bold text-lg text-center my-4'>
          MEET THE MANAGEMENTS
        </h2> */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4'>
          {management.map(({ name, img, position }, i) => {
            return (
              <div
                key={i}
                className='flex flex-col items-center justify-center'
              >
                <img
                  className='w-52 h-52 md:w-72 md:h-72 object-cover rounded-full shadow-xl'
                  src={img}
                  alt={name}
                />
                <h2 className='uppercase text-sm mt-2 font-bold'>{name}</h2>
                <h2 className='capitalize italic text-sm'>{position}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
