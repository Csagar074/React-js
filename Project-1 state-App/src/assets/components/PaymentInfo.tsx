import React from "react";

type PaymentInfoProps = {
  activeBox: number | null;
  payments: number[];
};

function PaymentInfo({ activeBox, payments }: PaymentInfoProps) {
  if (activeBox === null) {
    return <h2>Please select a payment plan</h2>;
  }

  return (
    <div className="paymentInfo">
      <h2>Selected Payment</h2>
      <p>You need to pay ₹{payments[activeBox]}</p>
    </div>
  );
}

export default PaymentInfo;