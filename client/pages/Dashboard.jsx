import { useEffect, useState } from "react";
import {
  RotateCw,
  Play,
  Trash2,
  Pencil,
} from "lucide-react";

import {
  getOrders,
  deleteOrder,
  updateOrder,
} from "../api/orderApi";

import { runScheduler } from "../api/schedulerApi";
import AppLayout from "../components/layout/AppLayout";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [schedulerLoading, setSchedulerLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await getOrders(status);

      const payload = res?.data ?? {};
      const orderList = Array.isArray(payload)
        ? payload
        : payload?.data ?? [];

      setOrders(orderList);
    } catch (err) {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this order?")) return;

    await deleteOrder(id);
    fetchOrders();
  };

  const handleUpdate = async (id) => {
    const newStatus = prompt(
      "Enter new status (PLACED / PROCESSING / READY_TO_SHIP)"
    );

    if (!newStatus) return;

    await updateOrder(id, { status: newStatus });
    fetchOrders();
  };

  const handleScheduler = async () => {
    try {
      setSchedulerLoading(true);
      await runScheduler();
      fetchOrders();
    } finally {
      setSchedulerLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const getStatusColor = (s) => {
    switch (s) {
      case "PLACED":
        return "bg-blue-100 text-blue-700";
      case "PROCESSING":
        return "bg-yellow-100 text-yellow-700";
      case "READY_TO_SHIP":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentColor = (p) => {
    switch (p) {
      case "PAID":
        return "text-green-600";
      case "FAILED":
        return "text-red-600";
      default:
        return "text-orange-500";
    }
  };

  return (
    <AppLayout>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Orders Dashboard
          </h1>
          <p className="text-gray-500">
            Manage system orders in real time
          </p>
        </div>

        <div className="flex gap-3">

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All</option>
            <option value="PLACED">PLACED</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="READY_TO_SHIP">
              READY TO SHIP
            </option>
          </select>

          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            <RotateCw size={16} />
            Refresh
          </button>

          <button
            onClick={handleScheduler}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"
          >
            <Play size={16} />
            Run Scheduler
          </button>

        </div>

      </div>

      {/* BODY */}
      {loading ? (
        <div className="text-center p-10">
          Loading...
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center p-10 text-gray-500">
          No Orders Found
        </div>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
            >

              {/* ORDER ID */}
              <div className="flex justify-between items-center mb-3">

                <h2 className="font-bold text-lg">
                  #{o.orderId}
                </h2>

                <span
                  className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                    o.status
                  )}`}
                >
                  {o.status}
                </span>

              </div>

              {/* DETAILS */}
              <div className="space-y-2 text-sm text-gray-700">

                <p>
                  <span className="font-semibold">
                    Customer:
                  </span>{" "}
                  {o.customerName}
                </p>

                <p>
                  <span className="font-semibold">
                    Phone:
                  </span>{" "}
                  {o.phoneNumber}
                </p>

                <p>
                  <span className="font-semibold">
                    Product:
                  </span>{" "}
                  {o.productName}
                </p>

                <p>
                  <span className="font-semibold">
                    Amount:
                  </span>{" "}
                  ₹{o.amount}
                </p>

                <p className={getPaymentColor(o.paymentStatus)}>
                  <span className="font-semibold text-gray-700">
                    Payment:
                  </span>{" "}
                  {o.paymentStatus}
                </p>

                <p className="text-gray-400 text-xs">
                  Created:{" "}
                  {new Date(o.createdAt).toLocaleString()}
                </p>

              </div>

              {/* ACTIONS */}
              <div className="flex justify-between mt-4">

                <button
                  onClick={() => handleUpdate(o._id)}
                  className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <Pencil size={14} />
                  Update
                </button>

                <button
                  onClick={() => handleDelete(o._id)}
                  className="flex items-center gap-1 text-red-600 hover:underline"
                >
                  <Trash2 size={14} />
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </AppLayout>
  );
};

export default Dashboard;