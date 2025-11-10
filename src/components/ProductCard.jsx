import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../store/CartSlice";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../store/WishListSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

function ProductCard({ productConfig }) {
  const dispatch = useDispatch();
  const [isItemAddedToWishList, setIsAddedToWishList] = useState(false);

  return (
    <div
      id={productConfig?.id}
      className="h-fit w-90 shrink-0 p-2 border border-border"
    >
      <Link
        to={`/productPage/${productConfig?.productId}`}
        state={productConfig}
        className="h-120 w-full overflow-hidden rounded-md"
      >
        <img
          className="h-120 w-full object-cover"
          src={productConfig.productImages[0]}
          alt=""
        />
      </Link>
      <div className="w-full border border-border overflow-clip divide-x-[1px] divide-border rounded-md mt-2 flex items-center justify-between">
        <div
          onClick={() => {
            dispatch(
              addItemToCart({
                productId: productConfig.productId,
                banner: productConfig.productImages[0],
                title: productConfig.productName,
                price: productConfig.productPrice,
              })
            );
            toast.success("Item added to cart");
          }}
          className="flex-1 py-2 px-2 font-syne cursor-pointer  hover:bg-secondry"
        >
          ADD TO CART
        </div>
        <div
          onClick={() => {
            if (isItemAddedToWishList) {
              setIsAddedToWishList((prev) => !prev);
              dispatch(
                removeItemFromWishlist({ productId: productConfig.productId })
              );
              toast.success("Item removed from wishlist");
            } else {
              setIsAddedToWishList((prev) => !prev);
              dispatch(
                addItemToWishlist({
                  productId: productConfig.productId,
                  banner: productConfig.productImages[0],
                  title: productConfig.productName,
                  price: productConfig.productPrice,
                })
              );
              toast.success("Item added to wishlist");
            }
          }}
          className="px-4 text-xl h-full hover:bg-secondry py-2 border-border cursor-pointer"
        >
          <CiHeart className={isItemAddedToWishList ? "bg-red-500" : ""} />
        </div>
      </div>
      <h1 className="font-nunito font-semibold mt-1">
        ₹ {productConfig?.productPrice}
        <span className="text-text/50 text-xs line-through pl-1">₹1540</span>
        <span className="bg-green/50  border-green border-1 text-[10px] px-2  ml-5 rounded-full">
          BestSeller{" "}
        </span>
      </h1>
      <p className="text-text/50 text-sm font-nunito mt-2 ">
        HUSTLE Blue Oversized Graphic Back Printed T-shirt
      </p>
    </div>
  );
}

export default ProductCard;
