import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { getListOflatestProducts } from "../firebase/db";
import { useEffect, useState } from "react";

function Home() {
  const [latestProductsListing, setLatestProductListing] = useState([]);

  async function loadLatestProduct() {
    const res = await getListOflatestProducts();
    setLatestProductListing(res);
  }

  useEffect(() => {
    loadLatestProduct();
  }, []);

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
            {latestProductsListing.map((product) => {
              return <ProductCard productConfig={product} />;
            })}
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
