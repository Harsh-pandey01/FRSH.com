import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider({ value, onChange }) {
  const [internalValue, setInternalValue] = React.useState(value || [0, 10000]);

  const handleChange = (event, newValue) => {
    setInternalValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <Box className="w-full flex flex-col gap-2 text-text">
      <Typography variant="body2" sx={{ color: "var(--color-text, #a0a0a0)" }}>
        Price Range
      </Typography>

      <div className="flex justify-between text-xs text-text/70">
        <span>₹{internalValue[0]}</span>
        <span>₹{internalValue[1]}</span>
      </div>

      <Slider
        getAriaLabel={() => "Price range"}
        value={internalValue}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={10000}
        step={100}
        sx={{
          color: "#3b82f6", // bluish tone
          height: 4,
          "& .MuiSlider-thumb": {
            width: 16,
            height: 16,
            backgroundColor: "#fff",
            border: "2px solid #3b82f6",
            boxShadow: "0 0 0 4px rgba(59,130,246,0.3)",
            "&:hover": {
              boxShadow: "0 0 0 8px rgba(59,130,246,0.15)",
            },
          },
          "& .MuiSlider-track": {
            border: "none",
          },
          "& .MuiSlider-rail": {
            opacity: 0.3,
            backgroundColor: "#888",
          },
        }}
      />
    </Box>
  );
}
