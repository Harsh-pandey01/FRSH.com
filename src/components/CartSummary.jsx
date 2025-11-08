import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const CartSummary = () => {
  const { cartData } = useSelector((state) => state.cartdata);
  const navigate = useNavigate();
  console.log(cartData);
  const subtotal = cartData.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);
  console.log(subtotal);
  return (
    <div className=" p-6 bg-secondry font-syne ">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      <div className="flex justify-between py-2">
        <span>Subtotal</span>
        <span>${subtotal}</span>
      </div>
      {/* <div className="flex justify-between py-2 ">
        <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
        <span>${taxAmount.toFixed(2)}</span>
      </div>

      <div className="flex justify-between py-2 ">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>

      <div>
        <div className="flex justify-between py-2 ">
          <span>Discount</span>
          <span>- ${discount.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex justify-between py-4 mt-2 text-lg font-bold ">
        <span>Total</span>
      </div> */}
      <button
        onClick={() => {
          navigate("/checkoutPage");
        }}
        className="w-full mt-4 text-white bg-bluish py-3 rounded-md hover:opacity-90 transition"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
