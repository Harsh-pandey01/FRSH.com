import { createPortal } from "react-dom";
import ImageUploadPreview from "../../components/ImagesSelect";
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getListOfAllTheProductByAnAdmin } from "../../firebase/db";

function Products() {
  const { uid } = useParams();
  const [productsData, setProductsData] = useState([]);

  const handleProductsLoading = async () => {
    try {
      const products = await getListOfAllTheProductByAnAdmin(uid);
      setProductsData(products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleProductsLoading();
  }, []);
  return (
    <div className="w-full  h-full ">
      <div className="flex items-center   justify-between">
        <h1 className="font-syne text-xl mt-2">List of all products</h1>
        <Link
          to={`/admin/${uid}/addNewProduct`}
          className="font-syne text-sm px-2.5 py-1.75  mt-2 bg-bluish text-white rounded-md cursor-pointer"
        >
          Add New Item
        </Link>
      </div>
      <div className="mt-3">
        {productsData.length > 0 &&
          productsData.map((product) => {
            return (
              <div>
                <img src={product.productImages[0]} alt="" />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Products;
