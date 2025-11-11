import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { useSearchParams } from "react-router";

function Filters() {
  const [
    isFilterContainerForSmallDeviceOpen,
    setFilterContainerForSmallDevice,
  ] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("categories")?.split(",") || []
  );
  const [selectedSubCategories, setSelectedSubCategories] = useState(
    searchParams.get("subCategories")?.split(",") || []
  );
  const [selectedSize, setSelectedSize] = useState(
    searchParams.get("size") || ""
  );
  const [priceRange, setPriceRange] = useState([
    0,
    parseInt(searchParams.get("price") || 5000, 10),
  ]);

  // Update URL whenever filters change
  useEffect(() => {
    const params = {};
    if (selectedCategories.length)
      params.categories = selectedCategories.join(",");
    if (selectedSubCategories.length)
      params.subCategories = selectedSubCategories.join(",");
    if (selectedSize) params.size = selectedSize;
    if (priceRange[1] !== 5000) params.price = priceRange[1];
    setSearchParams(params);
  }, [selectedCategories, selectedSubCategories, selectedSize, priceRange]);

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedSize("");
    setPriceRange([0, 5000]);
    setSearchParams({});
  };

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleSubCategory = (sub) => {
    setSelectedSubCategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  return (
    <div className="fixed lg:relative bottom-0 lg:top-0 w-full lg:w-64 bg-primary/80 backdrop-blur-md lg:h-full border border-border shadow-sm flex items-center lg:flex-col gap-5 px-3 py-3">
      {/* Header */}
      <div className="h-full lg:h-fit flex items-center justify-between w-full">
        <div
          onClick={() => setFilterContainerForSmallDevice(true)}
          className="flex-1 lg:hidden font-syne rounded-md bg-secondry/70 border border-border text-center py-2 text-sm tracking-wide text-text hover:bg-secondry/90 transition-colors"
        >
          FILTERS
        </div>
        <div className="hidden lg:block text-text/70 text-sm font-semibold tracking-wide">
          Filters
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs uppercase font-semibold tracking-wide text-text/80 border border-border rounded-md hover:bg-secondry/80 transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Drawer */}
      <div
        className={`h-[90vh] lg:relative flex-1 fixed left-0 lg:bottom-0 ${
          isFilterContainerForSmallDeviceOpen ? "bottom-0" : "-bottom-full"
        } lg:bg-transparent lg:border-none transition-all ease-in-out duration-300 w-full bg-primary/95 backdrop-blur-2xl px-4 py-4 border-t lg:border-none border-border rounded-t-3xl overflow-y-auto`}
      >
        <div
          onClick={() => setFilterContainerForSmallDevice(false)}
          className="cursor-pointer flex items-center justify-end lg:hidden text-xl text-text/70"
        >
          <RxCross1 />
        </div>

        {/* Main Filters */}
        <div className="flex flex-col gap-6 mt-3 text-sm text-text/90">
          {/* Category Filter */}
          <div>
            <h3 className="mb-2 font-semibold uppercase tracking-wide text-text/70">
              Category
            </h3>
            <div className="flex flex-col gap-2">
              {["T-Shirts", "Hoodies", "Jackets", "Shoes"].map((cat) => (
                <label
                  key={cat}
                  className={`flex items-center gap-2 cursor-pointer px-2 py-1.5 rounded-md transition-all border border-transparent hover:border-border ${
                    selectedCategories.includes(cat.toLowerCase())
                      ? "bg-bluish/20 border-bluish/40"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.toLowerCase())}
                    onChange={() => toggleCategory(cat.toLowerCase())}
                    className="accent-bluish cursor-pointer"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* SubCategory Filter */}
          <div>
            <h3 className="mb-2 font-semibold uppercase tracking-wide text-text/70">
              Subcategory
            </h3>
            <div className="flex flex-col gap-2">
              {["Graphic", "Plain", "Zipped", "Sneakers", "High-Neck"].map(
                (sub) => (
                  <label
                    key={sub}
                    className={`flex items-center gap-2 cursor-pointer px-2 py-1.5 rounded-md transition-all border border-transparent hover:border-border ${
                      selectedSubCategories.includes(sub.toLowerCase())
                        ? "bg-bluish/20 border-bluish/40"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSubCategories.includes(
                        sub.toLowerCase()
                      )}
                      onChange={() => toggleSubCategory(sub.toLowerCase())}
                      className="accent-bluish cursor-pointer"
                    />
                    <span>{sub}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <h3 className="mb-2 font-semibold uppercase tracking-wide text-text/70">
              Size
            </h3>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSize(selectedSize === size ? "" : size)
                  }
                  className={`px-3 py-1.5 text-sm rounded-md border border-border font-medium transition-all ${
                    selectedSize === size
                      ? "bg-bluish text-white border-bluish shadow-[0_0_6px_rgba(0,150,255,0.4)]"
                      : "hover:bg-secondry/60 bg-transparent text-text/80"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="mb-2 font-semibold uppercase tracking-wide text-text/70">
              Price Range
            </h3>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-text/70">
                ₹{priceRange[0]} - ₹{priceRange[1]}
              </p>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([0, parseInt(e.target.value, 10)])
                }
                className="w-full accent-bluish cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text/60">
                <span>₹0</span>
                <span>₹5000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
