import { useEffect, useState } from "react";
import { RotateCw } from "lucide-react";
import { getOrders } from "../api/orderApi";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getOrders(status);

      setOrders(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const getStatusColor = (status) => {
    switch (status) {
      case "PLACED":
        return "bg-blue-100 text-blue-700";

      case "PROCESSING":
        return "bg-yellow-100 text-yellow-700";

      case "READY_TO_SHIP":
        return "bg-purple-100 text-purple-700";

      case "SHIPPED":
        return "bg-indigo-100 text-indigo-700";

      case "DELIVERED":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentColor = (status) => {
    switch (status) {
      case "PAID":
        return "text-green-600";

      case "FAILED":
        return "text-red-600";

      default:
        return "text-orange-500";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Order Dashboard
            </h1>

            <p className="text-slate-500 mt-2">
              Manage and monitor customer orders.
            </p>
          </div>

          <div className="flex gap-4">

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border bg-white px-4 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Orders</option>
              <option value="PLACED">Placed</option>
              <option value="PROCESSING">Processing</option>
              <option value="READY_TO_SHIP">Ready To Ship</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
            </select>

            <button
              onClick={fetchOrders}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
            >
              <RotateCw size={18} />
              Refresh
            </button>

          </div>

        </div>

        <div className="rounded-xl bg-white shadow-lg">

          {loading ? (
            <div className="py-20 text-center text-lg font-medium">
              Loading Orders...
            </div>
          ) : error ? (
            <div className="py-20 text-center text-red-500">
              {error}
            </div>
          ) : orders.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No Orders Found
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-slate-800 text-white">

                  <tr>
                    <th className="px-5 py-4 text-left">Order ID</th>
                    <th className="px-5 py-4 text-left">Customer</th>
                    <th className="px-5 py-4 text-left">Phone</th>
                    <th className="px-5 py-4 text-left">Product</th>
                    <th className="px-5 py-4 text-left">Amount</th>
                    <th className="px-5 py-4 text-left">Status</th>
                    <th className="px-5 py-4 text-left">Payment</th>
                    <th className="px-5 py-4 text-left">Created</th>
                  </tr>

                </thead>

                <tbody>

                  {orders.map((order) => (

                    <tr
                      key={order._id}
                      className="border-b hover:bg-slate-50 transition"
                    >
                      <td className="px-5 py-4 font-medium">
                        {order.orderId}
                      </td>

                      <td className="px-5 py-4">
                        {order.customerName}
                      </td>

                      <td className="px-5 py-4">
                        {order.phoneNumber}
                      </td>

                      <td className="px-5 py-4">
                        {order.productName}
                      </td>

                      <td className="px-5 py-4 font-semibold">
                        ₹ {order.amount}
                      </td>

                      <td className="px-5 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>

                      </td>

                      <td
                        className={`px-5 py-4 font-semibold ${getPaymentColor(
                          order.paymentStatus
                        )}`}
                      >
                        {order.paymentStatus}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;