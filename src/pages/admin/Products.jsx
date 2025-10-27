import { createPortal } from "react-dom";
import ImageUploadPreview from "../../components/ImagesSelect";
import { Link, useParams } from "react-router";

function Products() {
  const { uid } = useParams();
  return (
    <div className="w-full  h-full ">
      <div className="flex items-center  justify-between">
        <h1 className="font-syne text-xl mt-2">List of all products</h1>
        <Link
          to={`/admin/${uid}/addNewProduct`}
          className="font-syne text-sm px-2.5 py-2  mt-2 bg-bluish text-white rounded-md cursor-pointer"
        >
          Add New Item
        </Link>
      </div>
    </div>
  );
}

export default Products;
