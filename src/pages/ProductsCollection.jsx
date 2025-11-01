import React, { useEffect, useState } from "react";
import { getListOflatestProducts } from "../firebase/db";
import ProductCard from "../components/ProductCard";
import { IoIosArrowDown } from "react-icons/io";
import Filters from "../components/Filters";

function ProductsCollection() {
  const [allProductsCollections, setProductsCollection] = useState([]);
  const [searchInput, handleSearchInput] = useState("");
  const params = new URLSearchParams();

  const filterFromAllTheProducts = (filters) => {
    const results = allProductsCollections.filter((product) => {
      console.log(product);
      const matchCategory =
        !filters.category.length ||
        filters.category.includes(product.productCategory);
      const matchSubcategory =
        !filters.subcategory.length ||
        filters.subcategory.includes(product.subcategory);
      const matchSize =
        !filters.sizes.length ||
        product.sizes?.some((s) => filters.sizes.includes(s));

      return matchCategory && matchSubcategory && matchSize;
    });
    console.log(results);
    // setFilteredProducts(results);
  };

  const handleFiltersApply = (filters) => {
    if (filters.category.length) {
      params.set("category", filters.category.join(","));
    }
    if (filters.subcategory.length) {
      params.set("subcategory", filters.subcategory.join(","));
    }
    if (filters.sizes.length) {
      params.set("sizes", filters.sizes.join(","));
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);

    const selectedFilters = {
      category: params.get("category")?.split(",") || [],
      subcategory: params.get("subcategory")?.split(",") || [],
      sizes: params.get("sizes")?.split(",") || [],
    };

    filterFromAllTheProducts(selectedFilters);
  };

  async function loadLatestProduct() {
    const res = await getListOflatestProducts(10);
    setProductsCollection(res);
  }

  useEffect(() => {
    loadLatestProduct();
  }, []);

  return (
    <div className="w-full  flex lg:gap-10  h-[calc(100vh-72px)]  flex-col-reverse lg:flex-row">
      <div className="lg:w-60 bg-secondry lg:h-full border-r border-border  w-full lg:relative sticky bottom-0 left-0 ">
        <Filters onApply={handleFiltersApply} />
      </div>

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

        <div className=" grid grid-cols-[repeat(auto-fill,minmax(270px,350px))]  w-full gap-5 justify-center lg:justify-start ">
          {allProductsCollections.map((product) => {
            return <ProductCard productConfig={product} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductsCollection;
