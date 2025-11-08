import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useTheme } from "../context/themeContext";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router";
import CartSummary from "../components/CartSummary";

function Cart() {
  const { theme } = useTheme();
  const { cartData } = useSelector((state) => state.cartdata);

  return (
    <div className="w-full px-5 pt-5">
      <button
        onClick={() => {
          history.back();
        }}
        className="border border-border px-5 py-1 rounded-sm cursor-pointer group"
      >
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
          <CartSummary />
        </div>
      </div>
    </div>
  );
}

export default Cart;
