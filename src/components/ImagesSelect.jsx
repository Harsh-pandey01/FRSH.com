import React, { useRef, useState } from "react";

export default function ImageUploader({ onChange }) {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleSelect = (e) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    const updatedFiles = [...files, ...selectedFiles];
    const updatedImages = [...images, ...newPreviews];

    setFiles(updatedFiles);
    setImages(updatedImages);
    if (onChange) onChange(updatedFiles);
  };

  const handleRemove = (index) => {
    const newFiles = [...files];
    const newImages = [...images];
    newFiles.splice(index, 1);
    newImages.splice(index, 1);
    setFiles(newFiles);
    setImages(newImages);
    if (onChange) onChange(newFiles);
  };

  return (
    <div className="w-full">
      <label className="block text-text font-medium mb-2">Product Image</label>

      <div className="flex gap-3 flex-wrap">
        {/* Upload box */}
        <div
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className="w-28 h-28 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-blue-500 transition"
        >
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleSelect}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4"
            />
          </svg>
          <span className="text-sm select-none">Click to Upload</span>
        </div>

        {/* Image previews */}
        {images.map((src, index) => (
          <div
            key={index}
            className="relative w-28 h-28 rounded-md overflow-hidden group"
          >
            <img
              src={src}
              alt={`upload-${index}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => handleRemove(index)}
              className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition text-sm font-medium"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
