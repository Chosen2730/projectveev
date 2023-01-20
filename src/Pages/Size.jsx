import React from "react";
import { Link } from "react-router-dom";
import size from "../images/size.jpg";

const Size = () => {
  return (
    <div>
      <div className='flex item-center justify-center'>
        <img src={size} alt='size' />
      </div>
    </div>
  );
};

export default Size;
