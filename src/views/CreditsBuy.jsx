import React from "react";
import StripeComp from "../components/StripeComp";

export default function CreditsBuy() {
  return (
    <div>
      <StripeComp className="stripe_card" />
      <div className="test_card">
        <h3>Test Card:</h3>
        <div className="paragraphs_columns">
          <div>
            <p>Number:</p>
            <p>MM/YY:</p>
            <p>CVC:</p>
            <p>ZIP:</p>
          </div>
          <div>
            <p>4242424242424242</p>
            <p>42/42</p>
            <p>424</p>
            <p>24242</p>
          </div>
        </div>
      </div>
    </div>
  );
}
