import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { addItemToCart } from "../store/CartSlice";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../store/WishListSlice";
import { CiHeart } from "react-icons/ci";
import ProductCard from "../components/ProductCard";

function ProductPage() {
  const { state: productInfo } = useLocation();
  const [isItemAddedToWishList, setIsAddedToWishList] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const dispatch = useDispatch();
  const activeImageRef = useRef(null);
  const { allProducts } = useSelector((state) => state.productsData);

  const loadSimilarProducts = () => {
    if (allProducts) {
      const similar = allProducts.filter((item) => {
        return (
          item.productCategory == productInfo.productCategory &&
          item.productId != productInfo.productId
        );
      });
      setSimilarProducts(similar);
    }
  };

  useEffect(() => {
    loadSimilarProducts();
  }, [allProducts, productInfo]);

  return (
    <>
      <div className="w-full lg:grid-cols-2 h-fit px-5 py-5 grid grid-cols-1 gap-10">
        {/* Images Wrapper */}
        <div className="flex gap-5 flex-col md:flex-row-reverse">
          <div className="w-full flex-1 h-120 md:h-150 lg:h-200 border p-2 border-border">
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
        <div className="md:py-2.5 flex flex-col gap-3">
          <h1 className=" font-bbh md:text-6xl text-3xl">
            {productInfo.productName}
          </h1>
          <p className="tracking-tight text-xl md:text-xl font-inter max-w-[80%] leading-tight">
            {productInfo.productDescription}
          </p>
          <p className=" font-bbh flex items-center text-3xl">
            ₹{productInfo?.productPrice}
            <span className="text-2xl pl-3 line-through text-text/70">
              ₹{productInfo?.productPsudoPrice}
            </span>
          </p>

          <div>
            <div className="flex items-start gap-2">
              <p className="text-xl"> Available Sizes :</p>
              <div className="flex flex-1 items-center gap-2 flex-wrap">
                {productInfo?.productSizes.map((size) => {
                  return (
                    <div className=" bg-secondry cursor-pointer font-syne px-2 py-1.5 border border-border">
                      {size}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-full max-w-80 border border-border overflow-clip divide-x-[1px] divide-border rounded-md mt-2 flex items-center justify-between">
            <div
              onClick={() => {
                dispatch(
                  addItemToCart({
                    productId: productInfo.productId,
                    banner: productInfo.productImages[0],
                    title: productInfo.productName,
                    price: productInfo.productPrice,
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
                    removeItemFromWishlist({ productId: productInfo.productId })
                  );
                  toast.success("Item removed from wishlist");
                } else {
                  setIsAddedToWishList((prev) => !prev);
                  dispatch(
                    addItemToWishlist({
                      productId: productInfo.productId,
                      banner: productInfo.productImages[0],
                      title: productInfo.productName,
                      price: productInfo.productPrice,
                    })
                  );
                  toast.success("Item added to wishlist");
                }
              }}
              className="px-4 text-xl h-full hover:bg-secondry py-2 border-border cursor-pointer"
            >
              <CiHeart
                className={isItemAddedToWishList ? "fill-red-500" : ""}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Similar Products */}
      <div className="px-5 mt-10 py-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-inter tracking-tight font-semibold">
            SIMILAR PRODUCTS{" "}
          </h1>
          <div className="mt-3 flex overflow-x-scroll no-scrollbar items-center gap-2 shrink-0">
            {similarProducts.map((item) => {
              return <ProductCard productConfig={item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
