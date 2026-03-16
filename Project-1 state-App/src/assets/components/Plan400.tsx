type Props = {
  active: boolean;
  onClick: () => void;
};

export default function Plan400({ active, onClick }: Props) {
  return (
    <div className={`cabCard ${active ? "active" : ""}`} onClick={onClick}>
      <h3>🚐 Premium SUV</h3>
      <p>Luxury Ride</p>
      <h2>₹400</h2>
    </div>
  );
}