type Props = {
  active: boolean;
  onClick: () => void;
};

export default function Plan100({ active, onClick }: Props) {
  return (
    <div className={`cabCard ${active ? "active" : ""}`} onClick={onClick}>
      <h3>🚕 Mini Cab</h3>
      <p>Basic Ride</p>
      <h2>₹100</h2>
    </div>
  );
}