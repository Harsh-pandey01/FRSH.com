import React, { useEffect, useState } from "react";
import { getListOflatestProducts } from "../firebase/db";
import ProductCard from "../components/ProductCard";
import { RxCross1 } from "react-icons/rx";

import Filters from "../components/Filters";
import ProductCardShimmerPage from "../Shimmers/ProductCardShimmer";

function ProductsCollection() {
  const [allProductsCollections, setProductsCollection] = useState([]);
  const [searchInput, handleSearchInput] = useState("");
  const [finalProductsAfterFiltering, setFilteringOnTheProducts] =
    useState(null);

  async function loadLatestProduct() {
    const res = await getListOflatestProducts(10);
    setProductsCollection(res);
    setFilteringOnTheProducts(res);
  }

  useEffect(() => {
    loadLatestProduct();
  }, []);

  return (
    <div className="w-full relative flex lg:gap-10  h-[calc(100vh-72px)]  flex-col-reverse lg:flex-row">
      <Filters />
      <div className="flex-1 px-5 py-5 overflow-y-auto scroll-smooth  no-scrollbar flex gap-8 flex-col ">
        <div className="flex items-center justify-between ">
          <div>
            <input
              type="text"
              value={searchInput}
              className="w-70 md:w-100 max-w-100 px-2 py-2 outline-none bg-secondry border border-border font-inter text-sm"
              placeholder="Search Item here ...."
              onChange={(e) => {
                handleSearchInput(e.target.value);
              }}
            />
          </div>
          <div className="text-xs font-inter font-semibold">
            <select
              name="sortBy"
              id="sortBy"
              className="px-2 py-2 border border-border bg-secondry text-text"
            >
              <option value="" className="text-text bg-primary">
                Sort By
              </option>
              <option value="price" className="text-text bg-primary">
                Min Price To Max Price
              </option>
            </select>
          </div>
        </div>

        {finalProductsAfterFiltering == null ||
        finalProductsAfterFiltering.length == 0 ? (
          <ProductCardShimmerPage />
        ) : (
          <div className=" grid grid-cols-[repeat(auto-fill,minmax(270px,350px))]  w-full gap-5 justify-center lg:justify-start ">
            {finalProductsAfterFiltering.map((product) => {
              return <ProductCard productConfig={product} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsCollection;
