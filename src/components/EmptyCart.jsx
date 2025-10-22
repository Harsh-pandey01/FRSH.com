import React from "react";

function EmptyCart() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative">
        <img className="h-50" src="empty-cart-image.png" alt="" />
        <h1 className="text-center text-2xl  font-syne">
          Dabba toh khali hai ..
        </h1>
        <p className="text-sm text-center font-syne tracking-tight">
          Shop some trendy items nowww .
        </p>
      </div>
    </div>
  );
}

export default EmptyCart;
