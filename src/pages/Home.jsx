import React from "react";
import { CiHeart } from "react-icons/ci";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function Home() {
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
        <div className="w-full no-scrollbar mt-5 py-10 overflow-auto">
          <div className="flex gap-5">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>

        <div className="flex itece justify-center">
          <div className="bg-bluish font-syne text-white px-10 py-1.5 text-xl rounded-sm cursor-pointer shadow-2xs shadow-bluish mb-5">
            Explore All Products
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
