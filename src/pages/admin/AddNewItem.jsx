import { useRef, useState } from "react";
import { addNewItemByTheAdmin } from "../../firebase/db";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
// import CloudinaryAutoUpload from "../../hooks/handleMultipleImageUpload";
import uploadImagesToCloudinary from "../../hooks/handleMultipleImageUpload";

function AddNewItem() {
  const fileInputRef = useRef(null);
  const { uid } = useParams();
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [errorMsgData, setErrorMsgData] = useState({});
  const [productFormConfig, setProductFormData] = useState({
    productName: "",
    productDescription: "",
    productCategory: "",
    productSubCategory: "",
    productStock: "",
    productStockTrigger: "",
    productPrice: "",
    productPsudoPrice: "",
    productDiscountTag: "",
  });

  const handleSelect = (e) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    const updatedFiles = [...files, ...selectedFiles];
    const updatedImages = [...images, ...newPreviews];

    setFiles(updatedFiles);
    setImages(updatedImages);
    setProductFormData((prev) => ({ ...prev, productImages: updatedFiles }));
  };
  const handleRemove = (index) => {
    const newFiles = [...files];
    const newImages = [...images];
    newFiles.splice(index, 1);
    newImages.splice(index, 1);
    setFiles(newFiles);
    setImages(newImages);
  };

  const handleChage = (e) => {
    setProductFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const productValidationConfig = {
    productName: [
      {
        required: true,
        errorMsg: "Enter Product Name",
      },
    ],
    productDescription: [
      {
        required: true,
        errorMsg: "Provide some description about product",
      },
    ],
    productCategory: [
      {
        required: true,
        errorMsg: "Choose a category",
      },
    ],
    productSubCategory: [
      {
        required: true,
        errorMsg: "Choose a Sub Category",
      },
    ],
    productStock: [
      {
        required: true,
        errorMsg: "Enter the stocks available ",
      },
    ],
    productPrice: [
      {
        required: true,
        errorMsg: "Enter the price",
      },
      {
        minValue: 0,
        errorMsg: "Enter a valid price ( greater than 0 )",
      },
    ],
    productImages: [
      {
        minImages: 1,
        errorMsg: "Choose atlease one image",
      },
    ],
  };

  const validateNewItemFormForSubmission = () => {
    let isFormValid = true;

    for (let key in productValidationConfig) {
      let validation = productValidationConfig[key];
      let userValue = productFormConfig[key];
      validation.some((rule) => {
        if (rule.required) {
          if (!userValue) {
            setErrorMsgData((prev) => ({ ...prev, [key]: rule.errorMsg }));
            isFormValid = false;
            return true;
          }
        }

        if (rule.minValue !== undefined && rule.minValue !== null) {
          if (userValue <= rule.minValue) {
            setErrorMsgData((prev) => ({ ...prev, [key]: rule.errorMsg }));
            isFormValid = false;
            return true;
          }
        }

        if (rule.minImages) {
          if (userValue.length < rule.minImages) {
            setErrorMsgData((prev) => ({ ...prev, [key]: rule.errorMsg }));
            isFormValid = false;
            return true;
          }
        }
      });
    }

    return isFormValid;
  };

  async function uploadImage() {
    const url = await uploadImagesToCloudinary(files);
    return url;
  }

  const handleSubmit = async () => {
    let isFormValidForSubmission = validateNewItemFormForSubmission();
    console.log(isFormValidForSubmission);
    if (isFormValidForSubmission) {
      const assetsUploaded = await uploadImage();
      const res = await addNewItemByTheAdmin(uid, {
        ...productFormConfig,
        productId: crypto.randomUUID(),
        productImages: assetsUploaded,
      });
      if (res) {
        setTimeout(() => {
          navigate(`/admin/${uid}/products`);
        });
      }
    }
  };

  return (
    <div className="h-full overflow-y-auto pr-3">
      <h1 className="text-text/50 font-inter text-xs mt-2 flex  items-center gap-1.5">
        <span>product /</span>
        Add New Product
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="py-2 grid lg:grid-cols-2 gap-5 mt-2">
          <div>
            <div className="border rounded-md border-border">
              <div className="px-2 py-2 border-b border-border">
                <h1 className="font-semibold font-inter">
                  Name and Description
                </h1>
              </div>
              <div className="px-2 py-2.5 flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="product-name" className="text-xs">
                    Product's Name
                  </label>
                  <input
                    id="product-name"
                    name="productName"
                    value={productFormConfig?.productName}
                    onChange={handleChage}
                    type="text"
                    className="bg-secondry border border-border py-2 px-1 text-sm font-syne rounded-md text-text/80"
                    placeholder="Provide a great name for your product"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="product-description" className="text-xs">
                    Product's Description
                  </label>
                  <textarea
                    id="product-description"
                    value={productFormConfig?.productDescription}
                    onChange={handleChage}
                    name="productDescription"
                    className="w-full h-40 overflow-auto resize-none p-1.5  box-border border border-border text-sm font-syne rounded-md text-text/80"
                    placeholder="Add description of your product"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="border rounded-md border-border mt-4">
              <div className="px-2 py-2 border-b border-border">
                <h1 className="font-semibold font-inter">Category</h1>
              </div>
              <div className="px-2 py-2.5 flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="product-category" className="text-xs">
                    Product's Category
                  </label>
                  <select
                    name="productCategory"
                    value={productFormConfig?.productCategory}
                    onChange={handleChage}
                    id="product-category"
                    className="border bg-secondry cursor-pointer  border-border px-2 py-2 rounded-md text-text/80 text-sm font-syne"
                  >
                    <option value="" disabled selected>
                      Choose a category
                    </option>
                    <option value="mens-clothing">Men's Clothing</option>
                    <option value="womens-clothing">Women's Clothing</option>
                    <option value="unisex-clothing">Unisex Clothing</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="product-subcategory" className="text-xs">
                    Product's Sub-Categry
                  </label>
                  <select
                    name="productSubCategory"
                    value={productFormConfig?.productSubCategory}
                    onChange={handleChage}
                    id="product-subcategory"
                    className="border bg-secondry cursor-pointer  border-border px-2 py-2 rounded-md text-text/80 text-sm font-syne"
                  >
                    <option value="" disabled selected>
                      Choose a subcategory
                    </option>
                    <option value="tshirt">T-Shirt</option>
                    <option value="track">Track Pant</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="border rounded-md border-border">
              <div className="px-2 py-2 border-b border-border">
                <h1 className="font-semibold font-inter">Manage Stocks</h1>
              </div>
              <div className="px-2 py-2.5 flex flex-col gap-2">
                <div className="flex  items-center gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="product-stock" className="text-xs">
                      Number of items in stock
                    </label>
                    <input
                      id="product-stock"
                      value={productFormConfig?.productStock}
                      onChange={handleChage}
                      name="productStock"
                      type="number"
                      min={0}
                      className="bg-secondry border border-border py-2 px-1 text-sm font-syne rounded-md text-text/80"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="product-stock-trigger" className="text-xs">
                      Minimum stock to trigger limited
                    </label>
                    <input
                      id="product-stock-trigger"
                      name="productStockTrigger"
                      value={productFormConfig?.productStockTrigger}
                      onChange={handleChage}
                      type="number"
                      min={0}
                      className="bg-secondry border border-border py-2 px-1 text-sm font-syne rounded-md text-text/80"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="border rounded-md border-border">
              <div className="px-2 py-2 border-b border-border">
                <h1 className="font-semibold font-inter">Pricing</h1>
              </div>
              <div className="px-2 py-2.5 flex flex-col gap-2">
                <div className="flex items-center gap-5 ">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="product-price" className="text-xs">
                      Product's Price
                    </label>
                    <input
                      id="product-price"
                      name="productPrice"
                      value={productFormConfig?.productPrice}
                      onChange={handleChage}
                      type="number"
                      className="bg-secondry border border-border py-2 px-1 text-sm font-syne rounded-md text-text/80"
                      placeholder="Price for the product "
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="product-psudoprice" className="text-xs">
                      Product's Price
                    </label>
                    <input
                      id="product-psudoprice"
                      value={productFormConfig?.productPsudoPrice}
                      onChange={handleChage}
                      name="productPsudoPrice"
                      type="number"
                      className="bg-secondry  border border-border py-2 px-1 text-sm font-syne rounded-md text-text/80"
                      placeholder="Price before discount "
                    />
                  </div>
                </div>
                <div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="product-discount-tag" className="text-xs">
                      Product's Discount Tag
                    </label>
                    <input
                      id="product-discount-tag"
                      name="productDiscountTag"
                      value={productFormConfig?.productDiscountTag}
                      onChange={handleChage}
                      type="number"
                      className="bg-secondry border border-border py-2 px-1 text-sm font-syne rounded-md text-text/80"
                      placeholder="Discount in % "
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* images section */}
            <div className="border rounded-md border-border ">
              {/* <ImageUploader /> */}
              <label className="block text-text font-medium px-2 py-2 border-b border-border">
                Product Image
              </label>
              <div className="py-2.5 px-2.5 flex flex-wrap gap-3">
                <div
                  onClick={() => {
                    fileInputRef.current.click();
                  }}
                  className="h-30 w-30 cursor-pointer rounded-md hover:border-bluish flex-col text-center  flex items-center justify-center border border-border border-dashed"
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
                  <span className="text-xs whitespace-nowrap select-none">
                    Click to Upload
                  </span>
                </div>
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

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="px-4 py-2.5 bg-blue-400 text-white rounded-md shadow cursor-pointer font-semibold font-inter items-end hover:bg-bluish transition-all ease-in duration-200"
              >
                Add New Product
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddNewItem;
