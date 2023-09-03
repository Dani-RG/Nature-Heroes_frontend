import React from "react";
import { useOption } from "../context/OptionContext";
import { useNavigate } from "react-router-dom";

export default function CreditsItems() {
  const { setOption } = useOption();
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    const amount = event.target.value;
    setOption(amount);
    navigate("/checkout");
  };

  return (
    <div className="container_centered">
      <h3 className="bigger_text bolder_text small_margin">SELECT AMOUNT:</h3>
      <button
        className="bigger_text bolder_text create_btn"
        value={100}
        onClick={handleOptionChange}
      >
        100 credits
      </button>
      <button
        className="bigger_text bolder_text create_btn"
        value={500}
        onClick={handleOptionChange}
      >
        500 credits
      </button>
      <button
        className="bigger_text bolder_text create_btn"
        value={1000}
        onClick={handleOptionChange}
      >
        1000 credits
      </button>
    </div>
  );
}
