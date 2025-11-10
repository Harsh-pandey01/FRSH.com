import { FaRupeeSign } from "react-icons/fa";
import { GrProductHunt } from "react-icons/gr";
import { ImCart } from "react-icons/im";
import { IoPricetagOutline } from "react-icons/io5";
import Example from "./Charts/Example";
import SimpleAreaChart from "./Charts/Example";
import Orders from "./Orders";
function Dashboard() {
  return (
    <div>
      <div className="pt-2.5 flex items-center justify-between">
        <div>
          <div>
            <h1 className="text-xl font-inter">DASHBOARD</h1>
            <p className="text-text/70 text-xs">
              Welcome dear admin to your dashboard .
            </p>
          </div>
        </div>
        <div>
          <div className="h-12 w-12 bg-gray-600 rounded-full">
            <img src="" alt="" />
          </div>
        </div>
      </div>

      <div className="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-7 grid">
        <div className="px-5 py-5 border border-border rounded-xl">
          <div className="flex items-center justify-between">
            <h1 className="text-xl  font-syne font-semibold">Total Revenue</h1>
            <div className="px-3 text-xl py-3 bg-purple-500 text-white rounded-full border border-text">
              <FaRupeeSign />
            </div>
          </div>
          <div className="mt-2 ">
            <p className="text-3xl font-inter">₹ 50000</p>
            <p className="mt-5 font-inter text-xs text-text/60">
              Lifetime Sales
            </p>
          </div>
        </div>
        <div className="px-5 py-5 border border-border rounded-xl">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-syne font-semibold">Products Listed</h1>
            <div className=" text-5xl text-green">
              <GrProductHunt />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-inter ">10</p>
            <p className="mt-5 font-inter text-xs text-text/60">
              Currently Listed Products
            </p>
          </div>
        </div>
        <div className="px-5 py-5 border border-border rounded-xl">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-syne font-semibold">Total Orders</h1>
            <div className=" text-5xl text-red-400">
              <ImCart />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-inter  ">99</p>
            <p className="mt-5 font-inter text-xs text-text/60">
              Lifetime Orders Received
            </p>
          </div>
        </div>
        <div className="px-5 py-5 border border-border rounded-xl">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-syne font-semibold">Total Orders</h1>
            <div className=" text-5xl text-blue-400">
              <IoPricetagOutline />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-inter  ">99</p>
            <p className="mt-5 font-inter text-xs text-text/60">
              Lifetime Orders Received
            </p>
          </div>
        </div>
      </div>

      <div className="mt-7">
        <h1 className="text-xl font-inter">Monthly Sells Graph</h1>
        <SimpleAreaChart />
      </div>
    </div>
  );
}

export default Dashboard;
