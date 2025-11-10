import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import toast, { Toaster } from "react-hot-toast";
import { format } from "date-fns";

// ✅ Dummy Orders Data for Testing
const DUMMY_ORDERS = [
  {
    orderID: "ORD-87234",
    userData: {
      firstName: "Harsh",
      lastName: "Pandey",
      email: "harsh@example.com",
    },
    productInfo: [
      {
        banner:
          "https://res.cloudinary.com/dha51flmf/image/upload/v1762541749/ctsimb8xi7pja1iawaxk.jpg",
        title: "Slim Fit Cotton T-Shirt",
        price: 999,
        quantity: 2,
      },
    ],
    orderStatus: "Placed",
    totalAmount: 1998,
    createdAt: new Date("2025-11-01T12:30:00"),
  },
  {
    orderID: "ORD-57219",
    userData: {
      firstName: "Riya",
      lastName: "Sharma",
      email: "riya@example.com",
    },
    productInfo: [
      {
        banner:
          "https://res.cloudinary.com/dha51flmf/image/upload/v1762240382/dab7azajod3rldathe2m.jpg",
        title: "Blue Denim Jeans",
        price: 1299,
        quantity: 1,
      },
    ],
    orderStatus: "Delivered",
    totalAmount: 1299,
    createdAt: new Date("2025-11-06T18:45:00"),
  },
];

const AdminOrdersTable = () => {
  const [orders, setOrders] = useState(DUMMY_ORDERS);
  const [statusFilter, setStatusFilter] = useState("");

  // ✅ Handle Inline Order Status Update
  const handleStatusChange = (orderID, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.orderID === orderID ? { ...order, orderStatus: newStatus } : order
      )
    );
    toast.success(`Order ${orderID} marked as ${newStatus}`);
  };

  // ✅ Columns Definition
  const columns = useMemo(
    () => [
      {
        header: "Order ID",
        accessorKey: "orderID",
        cell: ({ row }) => (
          <div className="font-semibold text-gray-800">
            #{row.original.orderID}
          </div>
        ),
      },
      {
        header: "Customer",
        accessorKey: "userData",
        cell: ({ row }) => {
          const { firstName, lastName, email } = row.original.userData;
          return (
            <div>
              <div className="font-medium text-gray-800">
                {firstName} {lastName}
              </div>
              <div className="text-xs text-gray-500">{email}</div>
            </div>
          );
        },
      },
      {
        header: "Product Details",
        accessorKey: "productInfo",
        cell: ({ row }) => {
          const product = row.original.productInfo[0];
          return (
            <div className="flex items-center gap-3">
              <img
                src={product.banner}
                alt={product.title}
                className="w-12 h-12 rounded-md border object-cover"
              />
              <div>
                <div className="font-medium text-gray-800 text-sm">
                  {product.title}
                </div>
                <div className="text-xs text-gray-500">
                  ₹{product.price} × {product.quantity}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        header: "Total",
        accessorKey: "totalAmount",
        cell: ({ row }) => (
          <div className="font-semibold text-gray-700">
            ₹{row.original.totalAmount}
          </div>
        ),
      },
      {
        header: () => (
          <div className="flex items-center gap-2">
            <span>Status</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-md text-sm px-1 py-0.5 bg-white outline-none cursor-pointer"
            >
              <option value="">All</option>
              <option value="Placed">Placed</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ),
        accessorKey: "orderStatus",
        cell: ({ row }) => {
          const status = row.original.orderStatus;
          const colorClasses = {
            Placed: "bg-blue-100 text-blue-700",
            Processing: "bg-yellow-100 text-yellow-700",
            Delivered: "bg-green-100 text-green-700",
            Cancelled: "bg-red-100 text-red-700",
          };
          return (
            <select
              value={status}
              onChange={(e) =>
                handleStatusChange(row.original.orderID, e.target.value)
              }
              className={`text-xs font-medium rounded-md px-2 py-1 ${colorClasses[status]} outline-none border-none cursor-pointer`}
            >
              <option value="Placed">Placed</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          );
        },
      },
      {
        header: "Date",
        accessorKey: "createdAt",
        cell: ({ row }) => (
          <div className="text-sm text-gray-600">
            {format(row.original.createdAt, "dd MMM yyyy, hh:mm a")}
          </div>
        ),
      },
    ],
    [statusFilter]
  );

  // ✅ Apply filter
  const filteredOrders = useMemo(() => {
    if (!statusFilter) return orders;
    return orders.filter((o) => o.orderStatus === statusFilter);
  }, [orders, statusFilter]);

  // ✅ Table setup
  const table = useReactTable({
    data: filteredOrders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <Toaster />
      <h2 className="text-lg font-semibold mb-4">Admin Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left py-3 px-4 text-sm font-semibold text-gray-600"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-gray-500"
                >
                  No orders found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="py-3 px-4 text-sm text-gray-700"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersTable;
