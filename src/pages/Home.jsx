import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { getListOflatestProducts } from "../firebase/db";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../store/ProductSlice";
import ProductCardShimmer from "../Shimmers/ProductCardShimmer";

function Home() {
  const [latestProductsListing, setLatestProductListing] = useState([]);
  const productsCarausalRef = useRef(null);
  const dispatch = useDispatch();
  const allProductData = useSelector((state) => state.productsData);
  async function loadLatestProduct() {
    const res = await getListOflatestProducts();
    dispatch(fetchAllProduct(res));
    setLatestProductListing(res);
  }

  useEffect(() => {
    loadLatestProduct();
  }, []);

  const handleCarausalSlide = (direction) => {
    if (direction == "left") {
      productsCarausalRef.current.scrollLeft -= 200;
    } else {
      productsCarausalRef.current.scrollLeft += 200;
    }
  };

  return (
    <>
      <div className="w-full px-5">
        {/* banner */}
        <div className=" w-full mt-5 rounded-2xl overflow-clip">
          <img
            className="w-full"
            src="https://www.unifabindia.in/wp-content/uploads/2019/08/Company-logo-t-shirt.jpg"
            alt=""
          />
          <img
            className="w-full"
            src="https://images.bewakoof.com/uploads/grid/app/offer-strip-desktop-diwalijpg-1759830158.jpg"
            alt=""
          />
        </div>

        {/* Some Latest Collections */}
        <div className="w-full  mt-5 py-10 overflow-hidden relative">
          <button
            onClick={() => {
              handleCarausalSlide("left");
            }}
            className="absolute h-10 w-10 md:h-15 md:w-15 md:text-2xl text-black cursor-pointer hover:bg-white/70 rounded-full bg-white/50 flex items-center justify-center left-3 top-1/2 -translate-y-1/2"
          >
            <IoIosArrowBack />
          </button>
          <div
            ref={productsCarausalRef}
            className="flex gap-5 no-scrollbar overflow-auto scroll-smooth"
          >
            {latestProductsListing.length == 0 ? (
              <ProductCardShimmer />
            ) : (
              latestProductsListing.map((product) => {
                return <ProductCard productConfig={product} />;
              })
            )}
          </div>
          <button
            onClick={() => {
              handleCarausalSlide("right");
            }}
            className="absolute h-10 w-10 md:h-15 md:w-15 md:text-2xl text-black cursor-pointer hover:bg-white/70 rounded-full bg-white/50 flex items-center justify-center right-3 top-1/2 -translate-y-1/2"
          >
            <IoIosArrowForward />
          </button>
        </div>

        <div className="flex itece justify-center">
          <Link
            to={"collection"}
            className="bg-bluish font-syne text-white px-10 py-1.5 text-xl rounded-sm cursor-pointer shadow-2xs shadow-bluish mb-5"
          >
            Explore All Products
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
