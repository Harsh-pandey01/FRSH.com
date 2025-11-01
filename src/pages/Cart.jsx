import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useTheme } from "../context/themeContext";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";

function Cart() {
  const { theme } = useTheme();
  const { cartData } = useSelector((state) => state.cartdata);

  return (
    <div className="w-full px-5 pt-5">
      <button className="border border-border px-5 py-1 rounded-sm cursor-pointer group">
        <IoIosArrowRoundBack className="group-hover:-translate-x-2 duration-150 ease-in-out transition-all" />
      </button>

      <div className="flex items-start justify-between gap-10 w-full  mt-5">
        {/* Left Size */}
        <div
          className={`flex-1 border ${
            theme == "dark" ? "border-border" : "border-border"
          }  rounded-md`}
        >
          <div className="w-full flex items-start justify-between px-5 py-3 border-b border-b-border">
            <h1 className="font-syne ">Look At Your Cart</h1>
            <p>Total</p>
          </div>
          <div className="px-5 py-2 flex flex-col  divide-y-[1px] divide-border">
            {cartData.map((cartInfo) => {
              return <CartItem cartInfo={cartInfo} />;
            })}
          </div>
        </div>

        {/* right side */}

        <div className="w-100 border border-border  rounded-md overflow-clip">
          {/* <div className="py-2.5 flex items-center justify-between text-xl font-inter">
            <p className="">Total</p>
            <p>₹540</p>
          </div> */}
          <CartSummary />
        </div>
      </div>
    </div>
  );
}

export default Cart;

const CartSummary = ({
  subtotal = 100.0, // Default subtotal, replace with actual cart total
  taxRate = 0.1, // 10% tax
  shipping = 5.0, // Flat shipping rate
  discount = 0, // Optional discount
}) => {
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount + shipping - discount;

  return (
    <div className=" p-6 bg-secondry font-syne ">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

      <div className="flex justify-between py-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between py-2 ">
        <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
        <span>${taxAmount.toFixed(2)}</span>
      </div>

      <div className="flex justify-between py-2 ">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>

      {discount > 0 && (
        <div className="flex justify-between py-2 ">
          <span>Discount</span>
          <span>- ${discount.toFixed(2)}</span>
        </div>
      )}

      <div className="flex justify-between py-4 mt-2 text-lg font-bold ">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button className="w-full mt-4 text-white bg-bluish py-3 rounded-md hover:opacity-90 transition">
        Proceed to Checkout
      </button>
    </div>
  );
};
