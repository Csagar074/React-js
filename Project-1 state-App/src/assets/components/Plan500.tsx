type Props = {
  active: boolean;
  onClick: () => void;
};

export default function Plan500({ active, onClick }: Props) {
  return (
    <div className={`cabCard ${active ? "active" : ""}`} onClick={onClick}>
      <h3>🚘 Luxury Cab</h3>
      <p>Top Comfort</p>
      <h2>₹500</h2>
    </div>
  );
} 