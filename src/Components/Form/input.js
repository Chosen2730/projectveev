import React from "react";

const Input = ({
  id,
  title,
  input,
  textarea,
  type,
  dropdown,
  data,
  setItem,
  value,
  check,
  setCheck,
}) => {
  return (
    <div className={`${check ? "flex gap-2 items-center" : "block"} my-4`}>
      <label className='text-black text-sm block' htmlFor={id}>
        {title}
      </label>
      {input && (
        <input
          className='block bg-gray-100 p-4 rounded-md my-2 w-full text-sm'
          id={id}
          type={type}
          value={value}
          onChange={setItem}
          name={id}
          required
        />
      )}
      {textarea && (
        <textarea
          className='block w-full bg-gray-100 my-2'
          name={id}
          id=''
          cols='30'
          rows='4'
          value={value}
          onChange={setItem}
          required
        ></textarea>
      )}
      {dropdown && (
        <select
          className='w-full bg-gray-100 p-4 my-2'
          name={id}
          id=''
          onChange={setItem}
          value={value}
          required
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
      {check && (
        <input
          name={id}
          type='checkbox'
          checked={value === 'on'}
          onChange={setItem}
          onClick={setCheck}
        />
      )}
    </div>
  );
};

export default Input;
