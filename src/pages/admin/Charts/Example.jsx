import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function OrdersChart() {
  const monthlyOrdersData = [
    { month: "Jan", orders: 120, revenue: 14500 },
    { month: "Feb", orders: 98, revenue: 12300 },
    { month: "Mar", orders: 150, revenue: 17500 },
    { month: "Apr", orders: 130, revenue: 16000 },
    { month: "May", orders: 180, revenue: 21000 },
    { month: "Jun", orders: 165, revenue: 19500 },
    { month: "Jul", orders: 142, revenue: 17200 },
    { month: "Aug", orders: 175, revenue: 20500 },
    { month: "Sep", orders: 190, revenue: 23000 },
    { month: "Oct", orders: 210, revenue: 25500 },
    { month: "Nov", orders: 185, revenue: 22800 },
    { month: "Dec", orders: 240, revenue: 29000 },
  ];

  return (
    <ResponsiveContainer
      width="100%"
      height={500}
      className=" pr-10 outline-none bg-primary/20 py-5"
    >
      <LineChart data={monthlyOrdersData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="orders"
          stroke="#8884d8"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
