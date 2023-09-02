import React from "react";
import StripeComp from "../components/StripeComp";

export default function CreditsBuy() {

  return (
    <div>
      <StripeComp className="stripe_card" />
      <div className="test_card">
        <h3>Test Card:</h3>
        <div className="test_card_data">
          <div>
            <p>Number:</p>
            <p>MM/YY:</p>
            <p>CVC:</p>
            <p>ZIP:</p>
          </div>
          <div>
            <p>4242424242424242</p>
            <p>12/34</p>
            <p>123</p>
            <p>12345</p>
          </div>
        </div>
      </div>
    </div>
  );
}
