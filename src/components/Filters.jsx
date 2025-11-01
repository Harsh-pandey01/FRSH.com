import React, { useEffect, useRef, useState } from "react";

const DEFAULT = {
  category: [],
  subcategory: [],
  sizes: [],
};

const AVAILABLE = {
  category: [
    { id: "cat-men", label: "Men's Wear", value: "mens" },
    { id: "cat-women", label: "Women's Wear", value: "womens" },
    { id: "cat-kids", label: "Kids", value: "kids" },
  ],
  subcategory: [
    { id: "sub-tshirt", label: "T Shirt", value: "tshirt" },
    { id: "sub-shirt", label: "Shirt", value: "shirt" },
    { id: "sub-jeans", label: "Jeans", value: "jeans" },
  ],
  sizes: [
    { id: "size-s", label: "S", value: "S" },
    { id: "size-m", label: "M", value: "M" },
    { id: "size-l", label: "L", value: "L" },
    { id: "size-xl", label: "XL", value: "XL" },
    { id: "size-xxl", label: "XXL", value: "XXL" },
  ],
};

export default function Filters({ initialFilters = DEFAULT, onApply }) {
  const [open, setOpen] = useState(false); // mobile drawer open
  const [filters, setFilters] = useState(() => ({
    category: initialFilters.category ?? [],
    subcategory: initialFilters.subcategory ?? [],
    sizes: initialFilters.sizes ?? [],
  }));

  // collapse states for sections
  const [collapsed, setCollapsed] = useState({
    category: false,
    subcategory: false,
    sizes: false,
  });

  // tempFilters to hold changes before apply (so user can modify and then Apply)
  const [tempFilters, setTempFilters] = useState(filters);

  // refs for outside click
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  // handle outside click to close mobile drawer
  useEffect(() => {
    function handleClick(e) {
      if (!open) return;
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target) &&
        backdropRef.current &&
        backdropRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  const toggleItem = (group, value) => {
    setTempFilters((prev) => {
      const exists = prev[group].includes(value);
      return {
        ...prev,
        [group]: exists
          ? prev[group].filter((v) => v !== value)
          : [...prev[group], value],
      };
    });
  };

  const removeTag = (group, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [group]: prev[group].filter((v) => v !== value),
    }));
  };

  const handleApply = () => {
    setFilters(tempFilters);
    setOpen(false);
    onApply?.(tempFilters);
  };

  const handleReset = () => {
    setTempFilters({ category: [], subcategory: [], sizes: [] });
    setFilters({ category: [], subcategory: [], sizes: [] });
    onApply?.({ category: [], subcategory: [], sizes: [] });
  };

  // helper to render a section
  const Section = ({ title, name, items }) => {
    const isCollapsed = collapsed[name];
    return (
      <div className="border border-border rounded-sm bg-primary text-text">
        <button
          type="button"
          onClick={() =>
            setCollapsed((prev) => ({ ...prev, [name]: !prev[name] }))
          }
          className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium border-b border-border cursor-pointer"
          aria-expanded={!isCollapsed}
        >
          <span>{title}</span>
          <svg
            className={`w-4 h-4 transform transition-transform ${
              isCollapsed ? "-rotate-90" : "rotate-0"
            }`}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M6 8L10 12L14 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isCollapsed ? "max-h-0" : "max-h-96"
          }`}
        >
          <div className="divide-y divide-border">
            {items.map((it) => {
              const checked = tempFilters[name].includes(it.value);
              return (
                <label
                  key={it.id}
                  htmlFor={it.id}
                  className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer select-none"
                >
                  <input
                    id={it.id}
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleItem(name, it.value)}
                    className="w-4 h-4 border border-gray-300 rounded-sm accent-black"
                  />
                  <span className="text-sm">{it.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // tags to display selected filters (from tempFilters so preview works)
  const selectedTags = [
    ...tempFilters.category.map((v) => ({ group: "category", value: v })),
    ...tempFilters.subcategory.map((v) => ({ group: "subcategory", value: v })),
    ...tempFilters.sizes.map((v) => ({ group: "sizes", value: v })),
  ];

  return (
    <>
      {/* Desktop / large screen sidebar */}
      <aside className="hidden bg-secondry text-text font-syne lg:block w-60">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4 p-4 bg-transparent"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Filters</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs px-2 py-1 rounded border border-border"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => onApply?.(tempFilters)}
                className="text-xs px-3 py-1 rounded bg-bluish text-text"
              >
                Apply
              </button>
            </div>
          </div>

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((t, idx) => (
                <span
                  key={`${t.group}-${t.value}-${idx}`}
                  className="flex items-center gap-2 text-xs px-2 py-1 rounded-full border border-border"
                >
                  <span className="capitalize">{t.value}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(t.group, t.value)}
                    className="text-gray-500 text-xs"
                    aria-label={`Remove ${t.value}`}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Sections */}
          <div className="space-y-3">
            <Section
              title="Category"
              name="category"
              items={AVAILABLE.category}
            />
            <Section
              title="Sub Category"
              name="subcategory"
              items={AVAILABLE.subcategory}
            />
            <Section title="Sizes" name="sizes" items={AVAILABLE.sizes} />
          </div>
        </form>
      </aside>

      <div className="lg:hidden">
        <div className="fixed left-0 right-0 bottom-0 z-40 flex items-center justify-between gap-2 p-3 bg-primary border-t border-border">
          <button
            onClick={() => setOpen(true)}
            className="flex-1 py-2 px-3 rounded-md border border-border text-sm font-medium"
          >
            Filters
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-md text-sm border border-border"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 rounded-md text-sm bg-bluish text-text"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Backdrop */}
        {open && (
          <div
            ref={backdropRef}
            className="fixed inset-0 z-40  lg:hidden"
            aria-hidden
          />
        )}

        {/* Drawer */}
        <div
          ref={drawerRef}
          className={`fixed left-0 right-0 bottom-0 z-50 lg:hidden transform transition-transform duration-300 ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="max-h-[80vh] overflow-auto bg-primary rounded-t-lg shadow-xl pb-6">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="text-lg font-semibold">Filters</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {selectedTags.length} selected
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close filters"
                  className="p-2 rounded-md"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((t, idx) => (
                    <span
                      key={`${t.group}-${t.value}-${idx}`}
                      className="flex items-center gap-2 text-xs px-2 py-1 rounded-full border border-border"
                    >
                      <span className="capitalize">{t.value}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(t.group, t.value)}
                        className="text-gray-500 text-xs"
                        aria-label={`Remove ${t.value}`}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="space-y-3">
                <Section
                  title="Category"
                  name="category"
                  items={AVAILABLE.category}
                />
                <Section
                  title="Sub Category"
                  name="subcategory"
                  items={AVAILABLE.subcategory}
                />
                <Section title="Sizes" name="sizes" items={AVAILABLE.sizes} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
