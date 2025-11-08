import { useDispatch } from "react-redux";
import { addItemToCart, reduceItemQuantity } from "../store/CartSlice";

function CartItem({ cartInfo }) {
  const { banner, price, productId, quantity, title } = cartInfo;
  const dispatch = useDispatch();
  return (
    <div className="w-full flex justify-between py-5">
      <div className="flex gap-5 ">
        <div>
          <img
            className="h-30 w-30 object-cover rounded-md"
            src={banner}
            alt="image"
          />
        </div>
        <div>
          <h1 className="text-text/70 font-syne tracking-tight">{title}</h1>
          <h1 className="font-nunito font-semibold mt-1">
            ₹{price}
            <span className="text-text/50 text-xs line-through pl-1">
              ₹2000
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
            <div
              className="px-2 cursor-pointer hover:bg-secondry"
              onClick={() => {
                dispatch(reduceItemQuantity({ productId }));
              }}
            >
              -
            </div>
            <div className="px-2 font-inter">{quantity}</div>
            <div
              className="px-2 cursor-pointer hover:bg-secondry"
              onClick={() => {
                dispatch(addItemToCart({ productId }));
              }}
            >
              +
            </div>
          </div>
        </div>
      </div>
      <div className="font-inter">
        <span className="mr-1">₹</span>
        {quantity * +price}
      </div>
    </div>
  );
}

export default CartItem;
