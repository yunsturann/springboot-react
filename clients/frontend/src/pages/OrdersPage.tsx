import { useEffect, useState } from "react";

// ** Custom Components
import Container from "../components/Container";

// ** Types
import { IOrder } from "../types";

// ** Redux
import { RootState } from "../store";
import { useSelector } from "react-redux";

// ** Third Party
import axios from "axios";
import toast from "react-hot-toast";
import { cn } from "../lib/utils";
import Button from "../components/ui/Button";

const OrdersPage = () => {
  const userId = useSelector((state: RootState) => state.user.info?.id);

  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/private/orders/user/${userId}`);
        setOrders(response.data);
      } catch (error) {
        toast.error("Failed to fetch orders");
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const handleCancel = async (orderId: number) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      await axios.put(`/api/private/orders/${orderId}/cancel`, {
        withCredentials: true,
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "CANCELLED" } : order
        )
      );

      toast.success("Order cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel order");
    }
  };

  return (
    <section className="flex-1 bg-gray-100">
      <Container className="max-w-5xl py-3 sm:py-6 ">
        <h1 className="text-center text-3xl font-semibold text-very-dark-blue mb-4">
          My Orders
        </h1>
        <div className="overflow-auto contents">
          <table className="w-full border border-slate-200 overflow-auto rounded-lg shadow-lg shadow-purple-200/50">
            <thead>
              <tr className="bg-slate-400 text-white">
                <th className="border border-white text-left tracking-wide font-semibold px-3 py-2">
                  Order ID
                </th>
                <th className="border border-white text-left tracking-wide font-semibold px-3 py-2">
                  Adress Title
                </th>
                <th className="border border-white text-left tracking-wide font-semibold px-3 py-2">
                  Quantity
                </th>
                <th className="border border-white text-left tracking-wide font-semibold px-3 py-2">
                  Status
                </th>
                <th className="border border-white text-left tracking-wide font-semibold px-3 py-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const isEven = index % 2 === 0;
                return (
                  <tr
                    key={order.id}
                    className={`${isEven ? "bg-white" : "bg-slate-100"}`}
                  >
                    <td
                      className={cn(
                        "px-3 py-2 whitespace-nowrap border border-white",
                        {
                          "border-slate-100": isEven,
                        }
                      )}
                    >
                      {order.id}
                    </td>
                    <td
                      className={cn(
                        "px-3 py-2 whitespace-nowrap border border-white",
                        {
                          "border-slate-100": isEven,
                        }
                      )}
                    >
                      {order.contactInfo.title}
                    </td>
                    <td
                      className={cn(
                        "px-3 py-2 whitespace-nowrap border border-white",
                        {
                          "border-slate-100": isEven,
                        }
                      )}
                    >
                      {order.quantity}
                    </td>
                    <td
                      className={cn(
                        "px-3 py-2 whitespace-nowrap border border-white",
                        {
                          "border-slate-100": isEven,
                          "text-green-600": order.status === "RECEIVED",
                          "text-blue-600": order.status === "DELIVERED",
                          "text-red-500": order.status === "CANCELLED",
                        }
                      )}
                    >
                      {order.status}
                    </td>
                    <td
                      className={cn(
                        "px-3 py-2 whitespace-nowrap border border-white",
                        {
                          "border-slate-100": isEven,
                        }
                      )}
                    >
                      <Button
                        color="red"
                        onClick={() => handleCancel(order.id)}
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
};

export default OrdersPage;
