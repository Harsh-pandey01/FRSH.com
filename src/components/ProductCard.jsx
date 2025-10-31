import React from "react";
import { CiHeart } from "react-icons/ci";

function ProductCard({ productConfig }) {
  console.log(productConfig);
  return (
    <div
      id={productConfig?.id}
      className="h-150 w-90 min-w-90 p-2 border border-border"
    >
      <div className="h-120 w-full overflow-hidden rounded-md">
        <img
          className="h-full w-full object-cover"
          src={productConfig.productImages[0]}
          alt=""
        />
      </div>
      <div className="w-full border border-border overflow-clip divide-x-[1px] divide-border rounded-md mt-2 flex items-center justify-between">
        <div className="flex-1 py-2 px-2 font-syne cursor-pointer  hover:bg-secondry">
          ADD TO CART
        </div>
        <div className="px-4 text-xl h-full hover:bg-secondry py-2 border-border cursor-pointer">
          <CiHeart />
        </div>
      </div>
      <h1 className="font-nunito font-semibold mt-1">
        ₹540{" "}
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
