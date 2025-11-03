import { useEffect, useMemo, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa6";

function Filters({ callback }) {
  const [isSmallScreenFilterOpen, setSmallScreenFilter] = useState(false);
  const [isFilterOptionsOpen, setFilterOptionsOpen] = useState({
    Category: true,
    SubCategory: false,
    Sizes: false,
  });

  const [appliedFilters, setAppliedFilters] = useState({
    productCategory: [],
    productSubCategory: [],
    productSizes: [],
  });

  const filtersConfigData = [
    {
      title: "Category",
      options: [
        { name: "Men's Clothing", value: "mens-clothing" },
        { name: "Women's Clothing", value: "womens-clothing" },
      ],
    },
    {
      title: "SubCategory",
      options: [
        { name: "T Shirt", value: "tshirt" },
        { name: "Track Pants", value: "tracks" },
      ],
    },
    {
      title: "Sizes",
      options: [
        { name: "S", value: "s" },
        { name: "M", value: "m" },
        { name: "L", value: "l" },
        { name: "XL", value: "xl" },
        { name: "XXL", value: "xxl" },
      ],
    },
  ];

  // --- keep scroll locked when mobile drawer open ---
  useEffect(() => {
    document.body.style.overflow = isSmallScreenFilterOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSmallScreenFilterOpen]);

  // --- derived tags for UI (recomputed from appliedFilters) ---
  const selectedFiltersName = useMemo(() => {
    const tags = [];
    Object.keys(appliedFilters).forEach((key) => {
      (appliedFilters[key] || []).forEach((val) => {
        tags.push({ key, value: val });
      });
    });
    return tags;
  }, [appliedFilters]);

  // --- helper: toggle checkbox in state (controlled) ---
  const toggleFilter = (name, value) => {
    setAppliedFilters((prev) => {
      const arr = prev[name] || [];
      if (arr.includes(value)) {
        // remove
        return { ...prev, [name]: arr.filter((x) => x !== value) };
      } else {
        // add
        return { ...prev, [name]: [...arr, value] };
      }
    });
  };

  // Called by clicking the input directly (event.target)
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    setAppliedFilters((prev) => {
      const arr = prev[name] || [];
      if (checked) {
        if (!arr.includes(value)) return { ...prev, [name]: [...arr, value] };
        return prev;
      } else {
        return { ...prev, [name]: arr.filter((x) => x !== value) };
      }
    });
  };

  // Remove single tag (from the pills)
  const handleRemoveTag = (key, value) => {
    setAppliedFilters((prev) => {
      const arr = prev[key] || [];
      return { ...prev, [key]: arr.filter((x) => x !== value) };
    });
  };

  // RESET: clear state + url
  const handleReset = () => {
    const empty = {
      productCategory: [],
      productSubCategory: [],
      productSizes: [],
    };
    setAppliedFilters(empty);
  };

  // APPLY: write current filters to URL
  const handleApply = () => {
    const params = {};
    if (appliedFilters.productCategory?.length)
      params.productCategory = appliedFilters.productCategory.join(",");
    if (appliedFilters.productSubCategory?.length)
      params.productSubCategory = appliedFilters.productSubCategory.join(",");
    if (appliedFilters.productSizes?.length)
      params.productSizes = appliedFilters.productSizes.join(",");

    setSearchParams(params);
  };

  // --- callback safety: always send object with arrays, avoid undefined ---
  useEffect(() => {
    const safe = {
      productCategory: appliedFilters.productCategory || [],
      productSubCategory: appliedFilters.productSubCategory || [],
      productSizes: appliedFilters.productSizes || [],
    };

    if (typeof callback === "function") callback(safe);
  }, [appliedFilters]);

  // render single option (used by both desktop and mobile views)
  const renderOption = (filterCard, opt) => {
    const name = "product" + filterCard.title; // matches keys in appliedFilters
    const checked = (appliedFilters[name] || []).includes(opt.value);

    return (
      <div
        key={opt.value}
        className="px-1.5 py-2 flex gap-1.5 text-sm font-inter cursor-pointer items-center"
        // clicking this wrapper toggles the checkbox (keeps behaviour same on all screens)
        onClick={(e) => {
          e.stopPropagation();
          toggleFilter(name, opt.value);
        }}
      >
        <input
          id={`${name}-${opt.value}`}
          type="checkbox"
          name={name}
          value={opt.value}
          checked={checked}
          onChange={handleInputChange}
          onClick={(e) => e.stopPropagation()} // prevent double-handling when wrapper clicked
        />
        <label
          htmlFor={`${name}-${opt.value}`}
          onClick={(e) => e.stopPropagation()}
          className="cursor-pointer select-none"
        >
          {opt.name}
        </label>
      </div>
    );
  };

  return (
    <div>
      {/* Desktop sidebar (visible on lg and up) */}
      <div className="lg:w-60 hidden lg:flex flex-col h-full bg-secondry border-r border-border">
        <div className="h-full overflow-y-auto no-scrollbar flex flex-1">
          <div className="w-full gap-2 flex flex-col bg-primary px-2 py-2">
            {/* header */}
            <div className="flex items-center justify-between">
              <h1 className="text-text/60">Filters</h1>
              <div className="flex items-center gap-4 font-syne text-sm">
                <button onClick={handleReset} className="cursor-pointer">
                  RESET
                </button>
                <button
                  onClick={handleApply}
                  className="px-2 py-1 cursor-pointer text-white bg-bluish border border-border rounded-md"
                >
                  APPLY
                </button>
              </div>
            </div>

            {/* selected tags */}
            <div className="flex flex-wrap gap-3 mt-2">
              {selectedFiltersName.length === 0 && (
                <div className="text-xs text-text/60">No filters</div>
              )}
              {selectedFiltersName.map((t) => (
                <div
                  key={`${t.key}-${t.value}`}
                  onClick={() => handleRemoveTag(t.key, t.value)}
                  className="text-xs flex items-center gap-1 cursor-pointer hover:bg-primary transition-all duration-150 font-inter px-1 py-1 bg-secondry border border-border rounded-md"
                >
                  {t.value}
                  <RxCross2 />
                </div>
              ))}
            </div>

            {/* sections */}
            <div className="flex w-full mt-2 flex-1 font-inter flex-col gap-3">
              {filtersConfigData.map((filterCard) => (
                <div
                  key={filterCard.title}
                  className="border border-border rounded-sm"
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setFilterOptionsOpen((prev) => ({
                        ...prev,
                        [filterCard.title]: !prev[filterCard.title],
                      }));
                    }}
                    className="px-1.5 py-2 text-sm cursor-pointer border-b border-border flex items-center justify-between"
                  >
                    <p>{filterCard.title}</p>
                    <p
                      className={`transition-all ease-in duration-150 ${
                        isFilterOptionsOpen[filterCard.title]
                          ? "rotate-180"
                          : "rotate-0"
                      }`}
                    >
                      <FaChevronDown />
                    </p>
                  </div>

                  {isFilterOptionsOpen[filterCard.title] && (
                    <div className="divide-y-1 divide-border transition-all duration-200">
                      {filterCard.options.map((opt) =>
                        renderOption(filterCard, opt)
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="lg:hidden px-2 py-1 z-70 fixed w-full bottom-0 left-0 bg-primary text-text border-t border-border">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setSmallScreenFilter(true)}
            className="flex-1 cursor-pointer bg-secondry hover:bg-primary transition-all ease-in duration-100 border border-border flex items-center justify-center py-2.5 text-text font-syne rounded-md"
          >
            FILTERS
          </button>

          <div className="font-syne flex gap-3">
            <button onClick={handleReset} className="cursor-pointer">
              RESET
            </button>
            <button
              onClick={handleApply}
              className="px-2.5 py-1 cursor-pointer bg-bluish border border-border rounded-md"
            >
              APPLY
            </button>
          </div>
        </div>

        {/* Mobile drawer / sheet */}
        <div
          className={`absolute z-70 h-[100vh] flex items-end bg-primary/50 transition-all ease-in duration-200 left-0 w-full ${
            isSmallScreenFilterOpen ? "bottom-0" : "-bottom-[100vh]"
          }`}
          onClick={() => setSmallScreenFilter(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="h-140 max-h-140 overflow-y-auto no-scrollbar w-full gap-2 flex flex-col bg-primary border border-border rounded-t-4xl px-6 py-4"
          >
            <div className="flex items-center justify-between">
              <h1>Filters</h1>
              <p
                className="text-xl cursor-pointer"
                onClick={() => setSmallScreenFilter(false)}
              >
                <RxCross2 />
              </p>
            </div>

            {/* tags */}
            <div className="flex flex-wrap gap-3 mt-2">
              {selectedFiltersName.length === 0 && (
                <div className="text-xs text-text/60">No filters</div>
              )}
              {selectedFiltersName.map((t) => (
                <div
                  key={`${t.key}-${t.value}`}
                  onClick={() => handleRemoveTag(t.key, t.value)}
                  className="text-xs flex items-center gap-1 cursor-pointer hover:bg-primary transition-all duration-150 font-inter px-1 py-1 bg-secondry border border-border rounded-md"
                >
                  {t.value}
                  <RxCross2 />
                </div>
              ))}
            </div>

            {/* sections */}
            <div className="flex w-full mt-2 flex-1 font-inter flex-col gap-3 pb-8">
              {filtersConfigData.map((filterCard) => (
                <div
                  key={filterCard.title}
                  className="border border-border rounded-sm"
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setFilterOptionsOpen((prev) => ({
                        ...prev,
                        [filterCard.title]: !prev[filterCard.title],
                      }));
                    }}
                    className="px-1.5 py-2 text-sm cursor-pointer border-b border-border flex items-center justify-between"
                  >
                    <p>{filterCard.title}</p>
                    <p
                      className={`transition-all ease-in duration-150 ${
                        isFilterOptionsOpen[filterCard.title]
                          ? "rotate-180"
                          : "rotate-0"
                      }`}
                    >
                      <FaChevronDown />
                    </p>
                  </div>

                  {isFilterOptionsOpen[filterCard.title] && (
                    <div className="divide-y-1 divide-border transition-all duration-200">
                      {filterCard.options.map((opt) =>
                        renderOption(filterCard, opt)
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
