import React, { useState } from "react";

const Subscribe = () => {
  const [focus, setFocus] = useState(false);
  return (
    <div className='max-w-md mx-auto'>
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
          onFocus={() => setFocus(true)}
        />
        <button className='rounded-full p-4 py-6 bg-black text-white px-10'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
