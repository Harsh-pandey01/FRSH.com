import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function BasicDemo() {
  const data = [
    {
      code: "P1001",
      name: "Wireless Headphones",
      category: "Electronics",
      quantity: 25,
    },
    {
      code: "P1002",
      name: "Gaming Mouse",
      category: "Electronics",
      quantity: 40,
    },
    {
      code: "P1003",
      name: "Office Chair",
      category: "Furniture",
      quantity: 12,
    },
    {
      code: "P1004",
      name: "Water Bottle",
      category: "Accessories",
      quantity: 100,
    },
    {
      code: "P1005",
      name: "Running Shoes",
      category: "Footwear",
      quantity: 30,
    },
    {
      code: "P1006",
      name: "Smart Watch",
      category: "Electronics",
      quantity: 15,
    },
    {
      code: "P1007",
      name: "Desk Lamp",
      category: "Home Decor",
      quantity: 45,
    },
    {
      code: "P1008",
      name: "Bluetooth Speaker",
      category: "Electronics",
      quantity: 22,
    },
    {
      code: "P1009",
      name: "Backpack",
      category: "Accessories",
      quantity: 60,
    },
    {
      code: "P1010",
      name: "Coffee Mug",
      category: "Kitchenware",
      quantity: 80,
    },
  ];
  const [products, setProducts] = useState(data);

  return <div className="card ">showGridlines</div>;
}
