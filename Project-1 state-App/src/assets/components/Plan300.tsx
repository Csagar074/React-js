type Props = {
  active: boolean;
  onClick: () => void;
};

export default function Plan300({ active, onClick }: Props) {
  return (
    <div className={`cabCard ${active ? "active" : ""}`} onClick={onClick}>
      <h3>🚙 SUV</h3>
      <p>Family Ride</p>
      <h2>₹300</h2>
    </div>
  );
}