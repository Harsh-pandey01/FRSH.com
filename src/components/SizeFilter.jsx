import { useState } from "react";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function SizeFilter({ onChange }) {
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleSizeChange = (size) => {
    let updatedSizes;

    if (selectedSizes.includes(size)) {
      // Remove size if already selected
      updatedSizes = selectedSizes.filter((s) => s !== size);
    } else {
      // Add size to selection
      updatedSizes = [...selectedSizes, size];
    }

    setSelectedSizes(updatedSizes);
    onChange(updatedSizes);
  };

  return (
    <div className="border border-border rounded p-4">
      <div className="flex flex-col gap-2">
        {sizes.map((size) => (
          <label
            key={size}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <input
              type="checkbox"
              value={size}
              checked={selectedSizes.includes(size)}
              onChange={() => handleSizeChange(size)}
              className="cursor-pointer"
            />
            {size}
          </label>
        ))}
      </div>
    </div>
  );
}
