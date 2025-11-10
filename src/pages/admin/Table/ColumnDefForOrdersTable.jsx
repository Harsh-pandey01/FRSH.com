import toast from "react-hot-toast";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";

export const ColumnDefForOrdersTable = (
  statusFilter,
  setStatusFilter,
  setData
) => [
  {
    header: "Order Id",
    accessorKey: "orderID",
    cell: ({ row }) => {
      let id = row.original.orderID;
      id = id.length < 25 ? id : id.slice(0, 25) + " ...";
      console.log(row.original.orderID);
      return <p>{id}</p>;
    },
  },
  {
    header: "Order Info",
    accessorKey: "orderInformation",
    cell: ({ row }) => {
      let title = row.original.productInfo[0].title;
      title = title.length < 25 ? title : title.slice(0, 25) + " ...";
      return (
        <div className="flex items-start gap-1.5">
          <div className="h-15 w-15 rounded-md overflow-clip">
            <img
              className="h-full w-full object-cover object-top"
              src={row.original.productInfo[0].banner}
              alt="productImg"
            />
          </div>
          <div>
            <h1 className="text-sm font-inter ">{title}</h1>
          </div>
        </div>
      );
    },
  },
  {
    header: "Customer",
    cell: ({ row }) => {
      return <p>{row.original.userData.firstName}</p>;
    },
  },
  {
    header: "Order State",
    accessorKey: "State",
    cell: ({ row }) => {
      return <p>{row.original.userData.state}</p>;
    },
  },
  {
    header: "Payment",
    accessorKey: "payment",
    cell: ({ row }) => {
      const payment = "COD";
      return (
        <div className="px-2 py-0.5 rounded-md text-center bg-green-200 text-green-700 border border-green-800">
          {payment}
        </div>
      );
    },
  },
  {
    header: () => (
      <div className="flex items-center gap-2">
        <span>Status</span>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-border  rounded text-sm px-1.5 py-1 bg-secondry outline-none cursor-pointer"
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
    enableSorting: false,
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
          onChange={(e) => {
            const orderId = row.original.orderID;
            setData((prev) =>
              prev.map((order) =>
                order.orderID === orderId
                  ? { ...order, orderStatus: e.target.value }
                  : order
              )
            );
            toast.success(`Order ${orderId} marked as ${e.target.value}`);
          }}
          className={`text-xs font-medium rounded px-2 py-1 ${colorClasses[status]} outline-none border-none cursor-pointer`}
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
    header: "Order Detail",
    accessorKey: "orderDetail",
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <button className="bg-secondry px-2.5 py-1.5 text-sm border border-border rounded-sm hover:bg-primary  cursor-pointer">
          Details
        </button>
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
            // onClick={() => onEdit(product)}
            className="border border-border cursor-pointer hover:bg-bluish transition-all duration-150 px-2 py-2 rounded-md border-dashed"
          >
            <MdOutlineEdit />
          </button>
          <button
            // onClick={() => onDelete(product)}
            className="border border-border cursor-pointer hover:border-red-500  transition-all duration-150 px-2 py-2 rounded-md border-dashed"
          >
            <AiTwotoneDelete />
          </button>
        </div>
      );
    },
  },
];
