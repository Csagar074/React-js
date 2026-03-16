type Props = {
  activePlan: number | null;
  onCancel: () => void;
};

export default function PaymentInfo({ activePlan, onCancel }: Props) {
  const prices = [100, 200, 300, 400, 500];

  if (activePlan === null) {
    return <p className="selectText">👆 Please select a cab plan</p>;
  }

  return (
    <div className="paymentInfo">
      <h3>✅ Selected Ride</h3>
      <h2>₹{prices[activePlan]}</h2>

      <button className="payBtn">
        Book Cab ₹{prices[activePlan]}
      </button>

      <button className="cancelBtn" onClick={onCancel}>
        ✕ Cancel
      </button>
    </div>
  );
}