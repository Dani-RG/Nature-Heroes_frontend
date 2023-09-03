import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import creditsService from "../services/creditsService";
import { useOption } from "../context/OptionContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function StripeComp() {
  const stripePromise = loadStripe(
    "pk_test_51N9WFJHupFniTzZZOpGJO3AAmCXXfwPWhhr6cgjooKjieFRh8taHug4OfE6wIdEbYtRCPkkmgyTU17ysz5CwVbIj00aTgMjQQW",
    { locale: "en" }
  );
  const { selectedOption } = useOption();
  const navigate = useNavigate();
  const { storeToken, removeToken, authenticateUser } = useContext(AuthContext);

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = 100 * selectedOption;
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      setLoading(true);

      if (!error) {
        const { id } = paymentMethod;

        try {
          const data = await creditsService.checkout({ id, amount });
          console.log(data);
          elements.getElement(CardElement).clear();

          removeToken();
          storeToken(data.authToken);
          authenticateUser();

          toast.success("Payment completed!");
          navigate("/me");
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleCheckout();
    };

    return (
      <form onSubmit={handleSubmit} className="stripe_card">
        <h3>Selected amount:</h3>
        <h3>{selectedOption} cr.</h3>
        <CardElement
          options={{
            style: {
              base: {
                iconColor: "#c4f0ff",
                color: "#0afd93",
                fontWeight: "500",
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "13px",
                lineHeight: "40px",
                fontSmoothing: "antialiased",
                "::placeholder": {
                  color: "#31b8fc",
                },
              },
              invalid: {
                iconColor: "#FFC7EE",
                color: "#FFC7EE",
              },
            },
          }}
        />
        <button className="buy_btn" disabled={!stripe}>
          {loading ? <div>Loading...</div> : "Buy"}
        </button>
      </form>
    );
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
