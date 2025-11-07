import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash } from "react-icons/fa";

/* ------------------ Paste your raw data here ------------------ */
/* I used the array you provided and called it `rawProducts` */
const rawProducts = [
  {
    productCategory: "mens-clothing",
    productId: "8ef51b46-e13a-4b80-be33-695c060de05b",
    productDiscountTag: "75",
    productSubCategory: "tshirt",
    productSizes: ["XXL", "XL", "M", "L", "S", "XS"],
    productStock: "1000",
    productPrice: "499",
    createdAt: {
      type: "firestore/timestamp/1.0",
      seconds: 1762191899,
      nanoseconds: 784000000,
    },
    productPsudoPrice: "999",
    productDescription:
      "Soft, breathable cotton T-shirt perfect for everyday wear.",
    productImages: [
      "https://res.cloudinary.com/dha51flmf/image/upload/v1762191892/cc4daaxqrjqjtsfo9g26.jpg",
      "https://res.cloudinary.com/dha51flmf/image/upload/v1762191893/oqyimfwl3rwrtohu8dnn.jpg",
      "https://res.cloudinary.com/dha51flmf/image/upload/v1762191893/fehh0chiugnihtheigkx.jpg",
      "https://res.cloudinary.com/dha51flmf/image/upload/v1762191894/barg0boonehjbbld0r1m.jpg",
      "https://res.cloudinary.com/dha51flmf/image/upload/v1762191893/zj8q6b6j0ufeguhkzw7q.jpg",
    ],
    adminId: "BqbT6KCYx0YIa7tpYD2T4LlTvFf1",
    productName: "Classic Cotton T-Shirt",
    productStockTrigger: "100",
  },
  {
    productName: "Slim Fit Blue Denim Jeans",
    createdAt: {
      type: "firestore/timestamp/1.0",
      seconds: 1762240389,
      nanoseconds: 398000000,
    },
    productSubCategory: "track",
    productStockTrigger: "100",
    productDiscountTag: "",
    productPrice: "799",
    adminId: "BqbT6KCYx0YIa7tpYD2T4LlTvFf1",
    productStock: "10000",
    productDescription:
      "This Classic White T-Shirt is made from 100% premium cotton, offering a soft and breathable feel throughout the day. Designed with a regular fit and a finely ribbed round neckline, it complements all body types. Perfect for layering or wearing on its own, this t-shirt pairs well with jeans, shorts, or joggers. Its durable stitching ensures shape retention even after multiple washes, making it an everyday essential for your wardrobe.",
    productPsudoPrice: "1299",
    productSizes: ["XS", "S", "M", "L", "XL", "XXL"],
    productCategory: "mens-clothing",
    productImages: [
      "https://res.cloudinary.com/dha51flmf/image/upload/v1762240382/dab7azajod3rldathe2m.jpg",
      "https://res.cloudinary.com/dha51flmf/image/upload/v1762240382/dun1eft5wyll927jq3ly.jpg",
    ],
    productId: "f5bbbdba-521c-4b8c-b43c-d982fba09f79",
  },
];
/* ---------------------------------------------------------------- */

function tsToDateString(ts) {
  if (!ts) return "";
  if (typeof ts === "string") return ts;
  if (ts.seconds) {
    const ms = ts.seconds * 1000 + Math.floor((ts.nanoseconds || 0) / 1e6);
    return new Date(ms).toLocaleString();
  }
  return "";
}

function normalizeProducts(raw = []) {
  return raw.map((p) => ({
    id: p.productId ?? p.productId ?? String(Math.random()).slice(2),
    title: p.productName ?? p.title ?? "Untitled",
    image:
      Array.isArray(p.productImages) && p.productImages.length > 0
        ? p.productImages[0]
        : "",
    price: Number(p.productPrice ?? 0),
    stock: Number(p.productStock ?? 0),
    orders: p.orders ?? 0, // not provided -> default 0
    status:
      Number(p.productStock ?? 0) > Number(p.productStockTrigger ?? 0)
        ? "active"
        : "low-stock",
    description: p.productDescription ?? "",
    createdAt: tsToDateString(p.createdAt),
    raw: p,
  }));
}

function SortableHeader({ column, title }) {
  const sorted = column.getIsSorted();
  return (
    <button
      className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
      onClick={column.getToggleSortingHandler()}
      title={`Sort by ${title}`}
    >
      <span>{title}</span>
      <span className="text-gray-400">
        {sorted === "asc" ? (
          <FaSortUp />
        ) : sorted === "desc" ? (
          <FaSortDown />
        ) : (
          <FaSort />
        )}
      </span>
    </button>
  );
}

/* Edit modal */
function EditModal({ open, product, onClose, onSave }) {
  const [form, setForm] = useState(product ?? {});
  useEffect(() => setForm(product ?? {}), [product]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-white rounded shadow p-6 z-10">
        <h3 className="text-lg font-semibold mb-3">Edit Product</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="flex flex-col text-sm">
            <span className="text-xs font-medium mb-1">Title</span>
            <input
              value={form.title ?? ""}
              onChange={(e) =>
                setForm((s) => ({ ...s, title: e.target.value }))
              }
              className="border px-3 py-2 rounded outline-none"
            />
          </label>

          <label className="flex flex-col text-sm">
            <span className="text-xs font-medium mb-1">Price</span>
            <input
              type="number"
              value={form.price ?? 0}
              onChange={(e) =>
                setForm((s) => ({ ...s, price: Number(e.target.value) }))
              }
              className="border px-3 py-2 rounded outline-none"
            />
          </label>

          <label className="flex flex-col text-sm">
            <span className="text-xs font-medium mb-1">Stock</span>
            <input
              type="number"
              value={form.stock ?? 0}
              onChange={(e) =>
                setForm((s) => ({ ...s, stock: Number(e.target.value) }))
              }
              className="border px-3 py-2 rounded outline-none"
            />
          </label>

          <label className="flex flex-col text-sm">
            <span className="text-xs font-medium mb-1">Orders</span>
            <input
              type="number"
              value={form.orders ?? 0}
              onChange={(e) =>
                setForm((s) => ({ ...s, orders: Number(e.target.value) }))
              }
              className="border px-3 py-2 rounded outline-none"
            />
          </label>

          <label className="flex flex-col text-sm md:col-span-2">
            <span className="text-xs font-medium mb-1">Image URL</span>
            <input
              value={form.image ?? ""}
              onChange={(e) =>
                setForm((s) => ({ ...s, image: e.target.value }))
              }
              className="border px-3 py-2 rounded outline-none"
            />
          </label>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onClose} className="px-3 py-2 rounded bg-gray-100">
            Cancel
          </button>
          <button
            onClick={() =>
              onSave({
                ...form,
                status: Number(form.stock) > 0 ? "active" : "low-stock",
              })
            }
            className="px-4 py-2 rounded bg-indigo-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* Delete confirmation */
function DeleteModal({ open, name, onClose, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white rounded shadow p-6 z-10">
        <h3 className="text-lg font-semibold">Confirm Delete</h3>
        <p className="mt-2 text-sm text-gray-600">
          Delete <strong>{name}</strong>? This action cannot be undone.
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onClose} className="px-3 py-2 rounded bg-gray-100">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductAdminTable() {
  const [products, setProducts] = useState(() =>
    normalizeProducts(rawProducts)
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);

  /* columns */
  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            ref={(el) => {
              if (!el) return;
              el.indeterminate = table.getIsSomeRowsSelected();
            }}
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            className="w-4 h-4"
            aria-label="Select all rows"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect?.()}
            onChange={row.getToggleSelectedHandler()}
            className="w-4 h-4"
            aria-label={`Select row ${row.id}`}
          />
        ),
        size: 20,
      },
      {
        accessorKey: "id",
        header: ({ column }) => <SortableHeader column={column} title="ID" />,
        cell: (info) => (
          <div className="text-xs font-mono">{info.getValue()}</div>
        ),
        size: 160,
      },
      {
        id: "image",
        header: "Image",
        cell: (info) => (
          <div className="flex items-center">
            <img
              src={info.row.original.image}
              alt={info.row.original.title}
              className="w-12 h-12 object-cover rounded"
            />
          </div>
        ),
        size: 80,
      },
      {
        accessorKey: "title",
        header: ({ column }) => (
          <SortableHeader column={column} title="Title" />
        ),
        cell: (info) => (
          <div className="font-medium text-sm">{info.getValue()}</div>
        ),
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <SortableHeader column={column} title="Price" />
        ),
        cell: (info) => <div>${Number(info.getValue()).toFixed(2)}</div>,
      },
      {
        accessorKey: "stock",
        header: ({ column }) => (
          <SortableHeader column={column} title="Stocks" />
        ),
        cell: (info) => <div>{info.getValue()}</div>,
      },
      {
        accessorKey: "orders",
        header: ({ column }) => (
          <SortableHeader column={column} title="Orders" />
        ),
        cell: (info) => <div>{info.getValue() ?? "-"}</div>,
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <SortableHeader column={column} title="Status" />
        ),
        cell: (info) => (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              info.getValue() === "active"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {info.getValue()}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const orig = row.original;
          return (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditing(orig);
                  setEditOpen(true);
                }}
                className="p-1 rounded hover:bg-gray-100"
                title="Edit"
              >
                <FaEdit className="text-indigo-600" />
              </button>

              <button
                onClick={() => {
                  setDeleting(orig);
                  setDeleteOpen(true);
                }}
                className="p-1 rounded hover:bg-gray-100"
                title="Delete"
              >
                <FaTrash className="text-red-600" />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: products,
    columns,
    state: { globalFilter, rowSelection, sorting, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.id,
  });

  /* handlers */
  const handleSave = (updated) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p))
    );
    setEditOpen(false);
    setEditing(null);
  };

  const handleConfirmDelete = () => {
    if (!deleting) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleting.id));
    setDeleteOpen(false);
    setDeleting(null);

    setRowSelection((s) => {
      const copy = { ...s };
      delete copy[deleting.id];
      return copy;
    });
  };

  const handleBulkDelete = () => {
    const ids = Object.keys(rowSelection).filter((k) => rowSelection[k]);
    if (ids.length === 0) {
      alert("No rows selected");
      return;
    }
    if (
      !confirm(
        `Delete ${ids.length} selected product(s)? This cannot be undone.`
      )
    )
      return;
    setProducts((prev) => prev.filter((p) => !ids.includes(p.id)));
    setRowSelection({});
  };

  /* global search: we already use table's globalFilter — but TanStack requires us to wire filtering logic if we want custom fields.
     For simplicity, we'll apply a manual front-end filter by updating table's globalFilter string and using getFilteredRowModel (which defaults
     to matching column values). To ensure search searches title/id/price, we can implement a simple custom filter function by pre-filtering products here,
     but for simplicity and speed for this demo we'll keep default filtered behavior (works well for strings). */

  /* To make global search search id/title/price, we can compute a filteredProducts derived state, but react-table's builtin filter can be used by setting
     globalFilter on table and adding a default column filter. For demo purposes this will work. */

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-2xl font-semibold">Admin Products</h1>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-white border rounded px-3 py-2">
            <input
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search ID, title, price..."
              className="outline-none text-sm"
            />
          </div>

          <button
            onClick={handleBulkDelete}
            className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete selected
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white border rounded">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700"
                    style={{
                      width: header.getSize() ? header.getSize() : undefined,
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No products found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 align-middle text-sm"
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

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 rounded border disabled:opacity-50"
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 rounded border disabled:opacity-50"
          >
            {"<"}
          </button>
          <span>
            Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 rounded border disabled:opacity-50"
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 rounded border disabled:opacity-50"
          >
            {">>"}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rows per page:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
              table.setPageIndex(0);
            }}
            className="border rounded px-2 py-1"
          >
            {[5, 10, 20, 50].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected summary */}
      <div className="mt-3 text-sm text-gray-700">
        Selected:{" "}
        <strong>{Object.values(rowSelection).filter(Boolean).length}</strong>{" "}
        product(s)
      </div>

      {/* Edit modal */}
      <EditModal
        open={editOpen}
        product={editing}
        onClose={() => {
          setEditOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
      />

      {/* Delete confirm modal */}
      <DeleteModal
        open={deleteOpen}
        name={deleting?.title}
        onClose={() => {
          setDeleteOpen(false);
          setDeleting(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
