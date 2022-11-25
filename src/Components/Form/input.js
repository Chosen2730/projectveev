import React from "react";

const Input = ({ id, title, input, textarea, type, dropdown, data, setItem, value }) => {
  return (
    <div className='my-4'>
      <label className='text-black text-sm block' htmlFor={id}>
        {title}
      </label>
      {input && (
        <input
          className='block bg-gray-100 p-4 rounded-md my-2 w-full text-sm'
          id={id}
          type={type}
          value={value}
          onChange={(e) => { setItem(e.target.value) }}
        />
      )}
      {textarea && (
        <textarea
          className='block w-full bg-gray-100 my-2'
          name=''
          id=''
          cols='30'
          rows='4'
          value={value}
          onChange={(e) => { setItem(e.target.value) }}
        ></textarea>
      )}
      {dropdown && (
        <select className='w-full bg-gray-100 p-4 my-2' name='' id=''
          onChange={(e) => { setItem(e.target.value) }}
        >
          {data.map((item, id) => {
            return (
              <option key={id} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
};

export default Input;
