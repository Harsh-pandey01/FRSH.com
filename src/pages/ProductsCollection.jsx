import React, { useEffect, useState } from "react";
import { getListOflatestProducts } from "../firebase/db";
import ProductCard from "../components/ProductCard";

function ProductsCollection() {
  const [productsCollections, setProductsCollection] = useState([]);

  async function loadLatestProduct() {
    const res = await getListOflatestProducts(10);
    setProductsCollection(res);
  }

  useEffect(() => {
    loadLatestProduct();
  }, []);

  return (
    <div>
      <div className="flex gap-5 no-scrollbar flex-wrap">
        {productsCollections.map((product) => {
          return <ProductCard productConfig={product} />;
        })}
      </div>
    </div>
  );
}

export default ProductsCollection;
