import React from "react";
import Hero from "../Components/About/hero";
import ceo from "../images/ceo.png";

const About = () => {
  const management = [
    { name: "John Doe", position: "Fashion Designer", img: ceo },
  ];
  return (
    <div className='max-w-4xl mx-auto p-4'>
      <Hero />
      <div className='shadow-md rounded-md p-4 my-10'>
        <h2 className='font-bold text-lg text-center my-4'>
          MEET THE MANAGEMENTS
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {management.map(({ name, img, position }, i) => {
            return (
              <div
                key={i}
                className='flex flex-col items-center justify-center'
              >
                <img
                  className='w-32 h-32 object-cover rounded-full shadow-md'
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
