import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { getListOfAllTheProductByAnAdmin } from "../../../firebase/db";
import { ColumnsDefForProductsTableOfAdmin } from "./ColumnsDefForProductsTableOfAdmin";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import OrdersTableSkeleton from "../../../Shimmers/TableShimmer";
function DataTable({ uid }) {
  const [productsDataByAdmin, setProductsDataByAdmin] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [sortingStateForTable, setSortedState] = useState([]);

  // fetch productsData
  const fetchProductOfAnAdmin = async () => {
    const res = await getListOfAllTheProductByAnAdmin(uid);
    if (res.length != 0) setProductsDataByAdmin(res);
    else setProductsDataByAdmin(null);
  };

  useEffect(() => {
    fetchProductOfAnAdmin();
  }, []);

  // table configration
  const columns = ColumnsDefForProductsTableOfAdmin(
    editModalOpen,
    deleteModalOpen
  );
  const tableInstance = useReactTable({
    data: productsDataByAdmin,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sortingStateForTable,
    },
    onSortingChange: setSortedState,
  });

  return (
    <>
      {productsDataByAdmin != null ? (
        productsDataByAdmin.length === 0 ? (
          // 🧩 Show shimmer when array is empty
          <OrdersTableSkeleton />
        ) : (
          // 🧾 Show table when data exists
          <table className="border max-h-[70%] mt-10 w-full border-border">
            <thead>
              {tableInstance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-2 py-2 border font-syne border-border font-semibold"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center justify-center gap-1 select-none">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {header.column.getCanSort() &&
                          (header.column.getIsSorted() ? (
                            {
                              desc: <IoIosArrowRoundDown />,
                              asc: <IoIosArrowRoundUp />,
                            }[header.column.getIsSorted()]
                          ) : (
                            <div className="flex items-center justify-center">
                              <IoIosArrowRoundUp />
                              <IoIosArrowRoundDown />
                            </div>
                          ))}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="font-inter text-sm divide-y divide-border">
              {tableInstance.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="text-center px-4 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : (
        // 🚫 When no data found
        <div className="text-xl font-inter  mt-10">No Product is Listed .</div>
      )}
    </>
  );
}

export default DataTable;
