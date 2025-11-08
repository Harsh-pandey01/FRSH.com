import { useState } from "react";

export default function PaymentCardDetails() {
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Format card number as XXXX XXXX XXXX XXXX
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
      setFormData({ ...formData, [name]: formatted });
      return;
    }

    // Format expiry as MM/YY
    if (name === "expiry") {
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{0,2})/, "$1/$2")
        .slice(0, 5);
      setFormData({ ...formData, [name]: formatted });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-md mt-5 bg-secondry text-text px-2.5 py-2.5 border border-border">
      <h2 className="text-xl font-syne font-semibold  mb-4">Card Details</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-xs font-medium ">Cardholder Name</label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            placeholder="John Doe"
            className=" w-full p-2 border border-border mt-2"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-text">
            Card Number
          </label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className=" w-full p-2 border border-border mt-2"
            maxLength="19"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-text">
              Expiry
            </label>
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              className="mt-1 w-full p-2 border border-border"
              maxLength="5"
            />
          </div>

          <div className="flex-1">
            <label className="block text-xs font-medium text-text">CVV</label>
            <input
              type="password"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              className="mt-1 w-full p-2 border border-border"
              maxLength="4"
            />
          </div>
        </div>

        <button
          type="button"
          className="w-full bg-bluish text-white py-2 rounded-md curpo"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}
