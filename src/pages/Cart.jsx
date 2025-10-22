import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useTheme } from "../context/themeContext";

function Cart() {
  const { theme } = useTheme();
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
            <div className="w-full flex justify-between py-5">
              <div className="flex gap-5 ">
                <div>
                  <img
                    className="h-30 rounded-md"
                    src="mens-pants-1.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-text/70 font-syne tracking-tight">
                    HUSTLE Blue Oversized Graphic Back Printed T-shirt
                  </h1>
                  <h1 className="font-nunito font-semibold mt-1">
                    ₹540{" "}
                    <span className="text-text/50 text-xs line-through pl-1">
                      ₹1540
                    </span>
                  </h1>

                  <select
                    name="size"
                    id="size"
                    className="px-4 border border-border font-syne py-1 mt-1.5 rounded-md outline-none text-text bg-white dark:bg-gray-800 dark:text-white"
                  >
                    <option
                      value=""
                      disabled
                      selected
                      className="text-text bg-secondry"
                    >
                      Size
                    </option>
                    <option value="L" cclassName="text-text bg-secondry">
                      L
                    </option>
                    <option value="XL" className="text-text bg-secondry">
                      XL
                    </option>
                    <option value="XXL" className="text-text bg-secondry">
                      XXL
                    </option>
                    <option value="M" className="text-text bg-secondry">
                      M
                    </option>
                  </select>

                  <div className="flex items-center border rounded-sm border-border w-fit divide-x-[1px] divide-border mt-2">
                    <div className="px-2 cursor-pointer hover:bg-secondry">
                      -
                    </div>
                    <div className="px-2 font-inter">00</div>
                    <div className="px-2 cursor-pointer hover:bg-secondry">
                      +
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-inter">
                <span className="mr-1">₹</span>540
              </div>
            </div>
            <div className="w-full flex justify-between py-5">
              <div className="flex gap-5 ">
                <div>
                  <img
                    className="h-30 rounded-md"
                    src="mens-pants-1.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-text/70 font-syne tracking-tight">
                    HUSTLE Blue Oversized Graphic Back Printed T-shirt
                  </h1>
                  <h1 className="font-nunito font-semibold mt-1">
                    ₹540{" "}
                    <span className="text-text/50 text-xs line-through pl-1">
                      ₹1540
                    </span>
                  </h1>

                  <select
                    name="size"
                    id="size"
                    className="px-4 border border-border font-syne py-1 mt-1.5 rounded-md outline-none text-text bg-white dark:bg-gray-800 dark:text-white"
                  >
                    <option
                      value=""
                      disabled
                      selected
                      className="text-text bg-secondry"
                    >
                      Size
                    </option>
                    <option value="L" cclassName="text-text bg-secondry">
                      L
                    </option>
                    <option value="XL" className="text-text bg-secondry">
                      XL
                    </option>
                    <option value="XXL" className="text-text bg-secondry">
                      XXL
                    </option>
                    <option value="M" className="text-text bg-secondry">
                      M
                    </option>
                  </select>

                  <div className="flex items-center border rounded-sm border-border w-fit divide-x-[1px] divide-border mt-2">
                    <div className="px-2 cursor-pointer hover:bg-secondry">
                      -
                    </div>
                    <div className="px-2 font-inter">00</div>
                    <div className="px-2 cursor-pointer hover:bg-secondry">
                      +
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-inter">
                <span className="mr-1">₹</span>540
              </div>
            </div>
            <div className="w-full flex justify-between py-5">
              <div className="flex gap-5 ">
                <div>
                  <img
                    className="h-30 rounded-md"
                    src="mens-pants-1.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-text/70 font-syne tracking-tight">
                    HUSTLE Blue Oversized Graphic Back Printed T-shirt
                  </h1>
                  <h1 className="font-nunito font-semibold mt-1">
                    ₹540{" "}
                    <span className="text-text/50 text-xs line-through pl-1">
                      ₹1540
                    </span>
                  </h1>

                  <select
                    name="size"
                    id="size"
                    className="px-4 border border-border font-syne py-1 mt-1.5 rounded-md outline-none text-text bg-white dark:bg-gray-800 dark:text-white"
                  >
                    <option
                      value=""
                      disabled
                      selected
                      className="text-text bg-secondry"
                    >
                      Size
                    </option>
                    <option value="L" cclassName="text-text bg-secondry">
                      L
                    </option>
                    <option value="XL" className="text-text bg-secondry">
                      XL
                    </option>
                    <option value="XXL" className="text-text bg-secondry">
                      XXL
                    </option>
                    <option value="M" className="text-text bg-secondry">
                      M
                    </option>
                  </select>

                  <div className="flex items-center border rounded-sm border-border w-fit divide-x-[1px] divide-border mt-2">
                    <div className="px-2 cursor-pointer hover:bg-secondry">
                      -
                    </div>
                    <div className="px-2 font-inter">00</div>
                    <div className="px-2 cursor-pointer hover:bg-secondry">
                      +
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-inter">
                <span className="mr-1">₹</span>540
              </div>
            </div>
            <div className="w-full flex justify-between py-5">
              <div className="flex gap-5 ">
                <div>
                  <img
                    className="h-30 rounded-md"
                    src="mens-pants-1.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-text/70 font-syne tracking-tight">
                    HUSTLE Blue Oversized Graphic Back Printed T-shirt
                  </h1>
                  <h1 className="font-nunito font-semibold mt-1">
                    ₹540{" "}
                    <span className="text-text/50 text-xs line-through pl-1">
                      ₹1540
                    </span>
                  </h1>

                  <select
                    name="size"
                    id="size"
                    className="px-4 border border-border font-syne py-1 mt-1.5 rounded-md outline-none text-text bg-white dark:bg-gray-800 dark:text-white"
                  >
                    <option
                      value=""
                      disabled
                      selected
                      className="text-text bg-secondry"
                    >
                      Size
                    </option>
                    <option value="L" cclassName="text-text bg-secondry">
                      L
                    </option>
                    <option value="XL" className="text-text bg-secondry">
                      XL
                    </option>
                    <option value="XXL" className="text-text bg-secondry">
                      XXL
                    </option>
                    <option value="M" className="text-text bg-secondry">
                      M
                    </option>
                  </select>

                  <div className="flex items-center border rounded-sm border-border w-fit divide-x-[1px] divide-border mt-2">
                    <div className="px-2 cursor-pointer hover:bg-secondry">
                      -
                    </div>
                    <div className="px-2 font-inter">00</div>
                    <div className="px-2 cursor-pointer hover:bg-secondry">
                      +
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-inter">
                <span className="mr-1">₹</span>540
              </div>
            </div>
            <div className="w-full flex justify-between py-5">
              <div className="flex gap-5 ">
                <div>
                  <img
                    className="h-30 rounded-md"
                    src="mens-pants-1.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-text/70 font-syne tracking-tight">
                    HUSTLE Blue Oversized Graphic Back Printed T-shirt
                  </h1>
                  <h1 className="font-nunito font-semibold mt-1">
                    ₹540{" "}
                    <span className="text-text/50 text-xs line-through pl-1">
                      ₹1540
                    </span>
                  </h1>

                  <select
                    name="size"
                    id="size"
                    className="px-4 border border-border font-syne py-1 mt-1.5 rounded-md outline-none text-text bg-white dark:bg-gray-800 dark:text-white"
                  >
                    <option
                      value=""
                      disabled
                      selected
                      className="text-text bg-secondry"
                    >
                      Size
                    </option>
                    <option value="L" cclassName="text-text bg-secondry">
                      L
                    </option>
                    <option value="XL" className="text-text bg-secondry">
                      XL
                    </option>
                    <option value="XXL" className="text-text bg-secondry">
                      XXL
                    </option>
                    <option value="M" className="text-text bg-secondry">
                      M
                    </option>
                  </select>

                  <div className="flex items-center border rounded-sm border-border w-fit divide-x-[1px] divide-border mt-2">
                    <div className="px-2 cursor-pointer hover:bg-secondry">
                      -
                    </div>
                    <div className="px-2 font-inter">00</div>
                    <div className="px-2 cursor-pointer hover:bg-secondry">
                      +
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-inter">
                <span className="mr-1">₹</span>540
              </div>
            </div>
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
