import React from "react";

const Subscribe = () => {
  return (
    <div className='md:w-3/4 mx-auto'>
      <p className='text-sm text-center'>
        Hear the lastest. (new products, exclusive offers and other suprises)
      </p>

      <form
        className='my-4 border-2 border-black flex items-center rounded-full'
        onSubmit={(e) => e.preventDefault()}
        action=''
      >
        <input
          className='w-full p-3 rounded-full px-8'
          placeholder='Email address'
          type='email'
        />
        <button className='rounded-full p-4 bg-black text-white px-10'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
