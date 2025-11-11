import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

import RangeSlider from "./InputRange";

function Filters() {
  const [
    isFilterContainerForSmallDeviceOpen,
    setFilterContainerForSmallDevice,
  ] = useState(false);

  const [price, setPriceRange] = useState(0);

  return (
    <div className=" h-15 fixed lg:relative bottom-0 lg:top-0 w-full lg:w-60 bg-primary lg:h-full  border flex items-center lg:flex-col gap-5 border-border shadow-2xs px-2.5 py-2">
      <div className="h-full lg:h-fit flex items-center justify-center lg:justify-between gap-2  w-full">
        <div
          onClick={() => {
            console.log("clicked");
            setFilterContainerForSmallDevice(true);
          }}
          className="flex-1 lg:hidden font-syne rounded-md bg-secondry border border-border text-center py-2"
        >
          FILTERS
        </div>
        <div className="hidden lg:block text-text/80 text-inter text-sm">
          FILTER
        </div>
        <div className="flex items-center gap-2.5 lg:gap-1.5">
          <button className="px-2.5 py-2 lg:text-sm cursor-pointer">
            RESET
          </button>
          <button className="px-2.5 text-white bg-bluish cursor-pointer py-1 text-center border-border border rounded-md">
            APPLY
          </button>
        </div>
      </div>
      <div
        className={`h-100 lg:relative flex-1  fixed left-0 lg:bottom-0  ${
          isFilterContainerForSmallDeviceOpen ? "bottom-0" : "-bottom-full"
        } lg:bg-transparent lg:border-none  transition-all ease-in duration-200  w-full bg-secondry/90 px-3 py-2.5 border border-border rounded-t-3xl`}
      >
        <div
          onClick={() => {
            console.log("clicked");
            setFilterContainerForSmallDevice(false);
          }}
          className="cursor-pointer flex items-center justify-end lg:hidden"
        >
          <RxCross1 />
        </div>

        {/* Main container for the filter  */}
        <div className="h-fit  mt-2.5 lg:mt-0 font-syne">
          <div>
            <h1>Category</h1>
            <div className="mt-2">
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={"mens"}
                  name={"category"}
                  id="mensCategory"
                />
                <label htmlFor="mensCategory">Men's Clothing</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={"womens"}
                  name={"category"}
                  id="womensCategory"
                />
                <label htmlFor="womensCategory">Women's Clothing</label>
              </div>
            </div>
          </div>
          <div className="mt-2.5">
            <h1>Sub Category</h1>
            <div className="mt-2">
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={"tshirt"}
                  name={"subcategory"}
                  id="tshirt"
                />
                <label htmlFor="tshirt">T Shirt</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={"pants"}
                  name={"subcategory"}
                  id="pants"
                />
                <label htmlFor="pants">Pants</label>
              </div>
            </div>
          </div>

          <div className="mt-2.5">
            <RangeSlider
              value={price}
              onChange={(val) => {
                setPriceRange(val);
                const params = new URLSearchParams(window.location.search);
                params.set("priceMin", val[0]);
                params.set("priceMax", val[1]);
                window.history.replaceState(
                  {},
                  "",
                  `${window.location.pathname}?${params}`
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
