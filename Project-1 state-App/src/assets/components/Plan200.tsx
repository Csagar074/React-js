type Props = {
  active: boolean;
  onClick: () => void;
};

export default function Plan200({ active, onClick }: Props) {
  return (
    <div className={`cabCard ${active ? "active" : ""}`} onClick={onClick}>
      <h3>🚖 Sedan</h3>
      <p>Comfort Ride</p>
      <h2>₹200</h2>
    </div>
  );
}