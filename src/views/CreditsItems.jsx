import React from "react";
import { useOption } from "../context/OptionContext";
import { useNavigate } from 'react-router-dom';

export default function CreditsItems() {
  const { selectedOption, setOption } = useOption();
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    const amount = event.target.value;
    setOption(amount);
    navigate("/checkout");
  };

  return (
    <div className="container_centered">
      <h3 className="bigger_text bolder_text small_margin">SELECT ITEM:</h3>

      <select value={selectedOption || ""} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        <option value={100}>100 credits</option>
        <option value={500}>500 credits</option>
        <option value={1000}>1000 credits</option>
      </select>
    </div>
  );
}
