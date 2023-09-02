import React, { useState } from "react";

export default function CreditsItems({ onSelect }) {
  const [amount, setAmount] = useState(0);

  const handleAmountSelected = (event) => {
    setAmount(event.target.value);
    onSelect(amount);
  };

  console.log(amount);

  return (
    <div className="container_centered">
      <h3 className="bigger_text bolder_text small_margin">SELECT ITEM:</h3>

      <button
        className="bigger_text bolder_text create_btn"
        value={100}
        onClick={handleAmountSelected}
      >
        100 credits
      </button>
      <button
        className="bigger_text bolder_text create_btn"
        value={500}
        onClick={handleAmountSelected}
      >
        500 credits
      </button>
      <button
        className="bigger_text bolder_text create_btn"
        value={1000}
        onClick={handleAmountSelected}
      >
        1000 credits
      </button>
    </div>
  );
}
