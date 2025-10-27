import { FaArrowRightLong } from "react-icons/fa6";
import ImageUploader from "../../components/ImagesSelect";

function AddNewItem() {
  return (
    <div className="h-full overflow-y-auto">
      <h1 className="text-text/50 font-inter text-xs mt-2 flex  items-center gap-1.5">
        <span>product /</span>
        Add New Product
      </h1>
      <div className="py-2 grid grid-cols-2 gap-5 mt-2">
        <div>
          <div className="border rounded-md border-border">
            <div className="px-2 py-2 border-b border-border">
              <h1 className="font-semibold font-inter">Name and Description</h1>
            </div>
            <div className="px-2 py-2.5 flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="product-name" className="text-xs">
                  Product's Name
                </label>
                <input
                  id="product-name"
                  name="productName"
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
                  name="productDescription"
                  class="w-full h-40 overflow-auto resize-none p-1.5  box-border border border-border text-sm font-syne rounded-md text-text/80"
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
                    name="productStock"
                    type="number"
                    min={0}
                    className="bg-secondry border border-border py-2 px-1 text-sm font-syne rounded-md text-text/80"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="product-stock" className="text-xs">
                    Minimum stock to trigger limited
                  </label>
                  <input
                    id="product-stock"
                    name="productStock"
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
                    type="number"
                    className="bg-secondry border border-border py-2 px-1 text-sm font-syne rounded-md text-text/80"
                    placeholder="Discount in % "
                  />
                </div>
              </div>
            </div>
          </div>

          {/* images section */}
          <div className="border rounded-md border-border px-2 py-1">
            <ImageUploader />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewItem;
