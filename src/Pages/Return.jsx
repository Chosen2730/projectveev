import React from "react";
import { useEffect } from "react";

const Return = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <div className='max-w-4xl mx-auto p-6 text-gray-700'>
      <h1 className='text-2xl uppercase font-bold'>Order and Return Policy</h1>
      <div className='text-sm'>
        <h2 className='my-4 text-uppercase font-bold'>RETURN</h2>

        <p className='my-3'>
          Your item must be unused and in the same condition that you received
          it. It must also be in the original packaging. For returns, you will
          have to send us a mail via  info@veevclothiers.com. Items must be
          returned within 48hrs of receipt within Lagos State. Items outside
          Lagos will be determined by us after your complaint is made known to
          us.
        </p>
        <p className='my-3'>Please note the following:</p>
        <div className='ml-4'>
          <li className='list-disc my-2'>Gift cards are non-refundable</li>
          <li className='list-disc my-2'>
            Your request will be processed based on evidence of purchase
          </li>
          <li className='list-disc my-2'>
            Items that are damaged or not in it original condition will not be
            considered for return.
          </li>
        </div>
        <h2 className='my-4 text-uppercase font-bold'>Refunds</h2>
        <p className='my-3'>
          This can only be considered on a normal price purchase; sale items
          cannot be refunded, as the price has been slashed already. You are
          open to refund if you got a wrong order and at the point of return, we
          found out that the item is out of stock.
        </p>
        <h2 className='my-4 text-uppercase font-bold'>Exchanges</h2>
        <p className='my-3'>
          This can be done for the same item or within the price range, you can
          reach out to us via  info@veevclothiers.com and send your item to us.
          <br />
          <br />
          <strong>Nigeria Address:</strong> 3rd floor, Glory house, 30 adatan
          road opposite St. Peter & Paul Cathedral, Isale Ake Abeokuta. Ogun
          State, Nigeria. <br />
          <br />
          {/* <strong>Canada Address:</strong> Calgary, Alberta Canada. */}
        </p>
        <p className='my-3'>
          Delivery Fee are non-refundable. During the refund process, the cost
          of return shipping will not be included. We will advise you use a
          reliable source for the items you are returning as we can’t guarantee
          receiving your items.
        </p>
      </div>
    </div>
  );
};

export default Return;
