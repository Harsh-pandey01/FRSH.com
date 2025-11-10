import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { ColumnDefForOrdersTable } from "./Table/ColumnDefForOrdersTable";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { useParams } from "react-router";
import { getAdminsOrdersListData } from "../../firebase/db";
import OrdersTableSkeleton from "../../Shimmers/TableShimmer";

function Orders() {
  const { uid } = useParams();
  const [data, setData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const getOrdersData = async () => {
    const res = await getAdminsOrdersListData(uid);
    if (res) setData(res);
    else setData(null);
  };

  useEffect(() => {
    getOrdersData();
  }, []);

  const filteredOrders = useMemo(() => {
    if (!statusFilter) return data;
    return data.filter((o) => o.orderStatus === statusFilter);
  }, [data, statusFilter]);

  const tableInstance = useReactTable({
    data: filteredOrders,
    columns: ColumnDefForOrdersTable(statusFilter, setStatusFilter, setData),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="text-xl">
      <div className="p-4 min-w-full">
        {data != null ? (
          data.length == 0 ? (
            <OrdersTableSkeleton />
          ) : (
            <table className="border max-h-[70%] mt-2 w-full  border-border">
              <thead className="">
                {tableInstance.getHeaderGroups().map((headerGroup) => {
                  return (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <th
                            key={header.id}
                            className="px-5 py-2 border font-syne border-border font-semibold  "
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <div className="flex items-center text-nowrap shrink-0 justify-center gap-1 select-none">
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
                      <td
                        key={cell.id}
                        className=" text-center px-4 text-nowrap  py-2"
                      >
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
          <div className="text-xl font-inter">No Orders is Recieved .</div>
        )}
      </div>
    </div>
  );
}

export default Orders;
