import { useRef } from "react";
import { useLocation } from "react-router";

function ProductPage() {
  const { state: productInfo } = useLocation();
  console.log(productInfo);
  const activeImageRef = useRef(null);
  return (
    <div className="w-full md:grid-cols-2 h-fit px-5 py-5 grid grid-cols-1 gap-10">
      {/* Images Wrapper */}
      <div className="flex gap-5 flex-col md:flex-row-reverse">
        <div className="w-full flex-1 h-120 md:h-150 border p-2 border-border">
          <img
            ref={activeImageRef}
            className="h-full w-full object-top object-cover"
            src={productInfo.productImages[0]}
            alt=""
          />
        </div>
        <div className="md:flex-col flex gap-2 h-fit">
          {productInfo.productImages.map((img) => {
            return (
              <div className=" p-1 border-border border  w-30">
                <img
                  className="w-full h-20 object-cover object-top hover:scale-105 transition-all ease-in duration-100 cursor-pointer"
                  src={img}
                  alt=""
                  onClick={(e) => {
                    activeImageRef.current.src = img;
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* description page */}
      <div className="md:py-2.5 flex flex-col gap-2.5">
        <h1 className="font-semibold font-robo text-4xl">
          {productInfo.productName}
        </h1>
        <p className="tracking-tight font-2xl font-robo">
          {productInfo.productDescription}
        </p>
        <p className="font-semibold flex items-center text-3xl">
          ₹{productInfo?.productPrice}
          <span className="text-2xl pl-3 line-through text-text/70">
            ₹{productInfo?.productPsudoPrice}
          </span>
        </p>
        <p>
          Category : {productInfo.productSubCategory} ,{" "}
          {productInfo.productCategory}{" "}
        </p>
        <div>
          <div className="flex items-start gap-2">
            <p> Available Sizes :</p>
            <div className="flex flex-1 items-center gap-2 flex-wrap">
              {productInfo?.productSizes.map((size) => {
                return (
                  <div className=" bg-secondry font-syne px-2 py-1.5 border border-border">
                    {size}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>Product Available Stocks : {productInfo?.productStock}</div>
      </div>
    </div>
  );
}

export default ProductPage;
