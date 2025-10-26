function Products() {
  return (
    <div className="w-full h-full ">
      <div className="flex items-center  justify-between">
        <h1 className="font-syne text-xl mt-2">List of all products</h1>
        <button className="font-syne text-sm px-2.5 py-2  mt-2 bg-bluish text-white rounded-md cursor-pointer">
          Add New Item
        </button>
      </div>
      <div></div>
    </div>
  );
}

export default Products;
