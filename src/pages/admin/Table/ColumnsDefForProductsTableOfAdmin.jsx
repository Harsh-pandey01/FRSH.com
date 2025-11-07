import { MdOutlineEdit } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";

export const ColumnsDefForProductsTableOfAdmin = ({ onEdit, onDelete }) => [
  {
    id: "select",
    enableSorting: false,
    header: ({ table }) => (
      <input
        className="cursor-pointer h-4 w-4"
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        indeterminate={
          table.getIsSomeRowsSelected() ? "indeterminate" : undefined
        }
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
        className="cursor-pointer h-4 w-4"
      />
    ),
  },

  {
    header: "PRODUCT ID",
    accessorKey: "productId",
    enableSorting: true,
    cell: ({ row }) => {
      const id = row.original.productId;
      return <p>{id.length < 20 ? id : id.slice(0, 20) + " ..."}</p>;
    },
  },

  {
    header: "PRODUCT DETAIL",
    accessorKey: "productName",
    enableSorting: true,
    cell: ({ row }) => {
      const img = row.original.productImages?.[0];
      const title =
        row.original.productName?.length < 40
          ? row.original.productName
          : row.original.productName.slice(0, 40) + " ...";

      const des =
        row.original.productDescription?.length < 40
          ? row.original.productDescription
          : row.original.productDescription.slice(0, 40) + " ...";

      return (
        <div className="flex gap-2.5 items-center">
          <img
            src={img || "/placeholder.png"}
            alt="product"
            className="h-20 w-20 object-cover rounded-md object-top border border-border"
          />
          <div className="text-start flex flex-col gap-1">
            <p className="font-semibold">{title}</p>
            <p className="text-text/60">{des}</p>
          </div>
        </div>
      );
    },
  },

  {
    header: "PRICE",
    accessorKey: "productPrice",
    enableSorting: true,
    cell: ({ row }) => `₹ ${row.original.productPrice}`,
  },

  {
    header: "STOCKS",
    accessorKey: "productStock",
    enableSorting: true,
    cell: ({ row }) => {
      const stock = Number(row.original.productStock) || 0;
      return (
        <p className="text-sm font-medium">
          {stock.toLocaleString("en-IN")} items left
        </p>
      );
    },
  },

  {
    header: "CATEGORY",
    accessorKey: "productCategory",
    enableSorting: true,
    cell: ({ row }) => {
      const { productCategory } = row.original;

      const formattedCategory = productCategory
        ?.split("-")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

      return (
        <div className="flex flex-col text-center">
          <p className=" text-text">{formattedCategory}</p>
        </div>
      );
    },
  },

  {
    header: "LISTING DATE",
    accessorKey: "createdAt",
    enableSorting: true,
    sortingFn: (a, b) => {
      const aTime = a.original.createdAt?.seconds ?? 0;
      const bTime = b.original.createdAt?.seconds ?? 0;
      return aTime - bTime;
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      if (!createdAt?.seconds) return "—";

      const date = new Date(
        createdAt.seconds * 1000 + createdAt.nanoseconds / 1e6
      );

      return (
        <span className="text-sm text-text">{date.toLocaleDateString()}</span>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => onEdit(product)}
            className="border border-border cursor-pointer hover:bg-bluish transition-all duration-150 px-2 py-2 rounded-md border-dashed"
          >
            <MdOutlineEdit />
          </button>
          <button
            onClick={() => onDelete(product)}
            className="border border-border cursor-pointer hover:border-red-500  transition-all duration-150 px-2 py-2 rounded-md border-dashed"
          >
            <AiTwotoneDelete />
          </button>
        </div>
      );
    },
  },
];
