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
function DataTable({ uid }) {
  const [productsDataByAdmin, setProductsDataByAdmin] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [sortingStateForTable, setSortedState] = useState([]);

  // fetch productsData
  const fetchProductOfAnAdmin = async () => {
    const res = await getListOfAllTheProductByAnAdmin(uid);
    setProductsDataByAdmin(res);
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
    <table className="border max-h-[70%] mt-10 w-full  border-border">
      <thead className="">
        {tableInstance.getHeaderGroups().map((headerGroup) => {
          return (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className="px-2 py-2 border font-syne border-border font-semibold  "
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
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody className="font-inter text-sm divide-y divide-border">
        {tableInstance.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className=" text-center px-4  py-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
