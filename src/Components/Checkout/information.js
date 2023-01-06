import React from "react";
import Input from "../Form/input";

const Information = ({ handleInputChange, regions }) => {
  const allRegions = regions.map((region) => region.region);
  return (
    <div>
      <div className='uppercase'>
        <Input
          setItem={handleInputChange}
          type='address'
          textarea
          id='address'
          title='delivery address'
        />
        <div className='grid grid-cols-2 items-center gap-4 w-full'>
          <Input
            setItem={handleInputChange}
            type='name'
            input
            id='first_name'
            title='first name'
          />
          <Input
            setItem={handleInputChange}
            type='name'
            input
            id='last_name'
            title='last name'
          />
        </div>
        <div className='grid grid-cols-2 items-center gap-4 w-full'>
          <Input
            setItem={handleInputChange}
            type='text'
            input
            id='company_name'
            title='company name'
          />
          <Input
            setItem={handleInputChange}
            type='name'
            dropdown
            data={allRegions}
            id='region'
            title='Country/Region'
          />
        </div>
        <div className='grid grid-cols-2 items-center gap-4 w-full'>
          <Input
            setItem={handleInputChange}
            type='address'
            input
            id='town'
            title='town/city'
          />
          <Input
            setItem={handleInputChange}
            type='address'
            input
            id='state'
            title='State'
          />
        </div>
        <div className='grid grid-cols-2 items-center gap-4 w-full'>
          <Input
            setItem={handleInputChange}
            type='tel'
            input
            id='tel'
            title='Phone Number'
          />
          <Input
            setItem={handleInputChange}
            type='email'
            input
            id='email'
            title='Email Address'
          />
        </div>
      </div>
    </div>
  );
};

export default Information;
