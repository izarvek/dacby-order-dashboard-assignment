import { randomUUID } from "crypto";
import Order from "../models/order.model";

class OrderService {
  async createOrder(orderData) {
    const order = await Order.create({
      orderId: randomUUID(),
      ...orderData,
    });

    return order;
  }

  async getAllOrders(filter = {}) {
    return await Order.find(filter).sort({ createdAt: -1 });
  }

  async getOrderById(id) {
    return await Order.findById(id);
  }

  async updateOrder(id, updateData) {
    return await Order.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteOrder(id) {
    return await Order.findByIdAndDelete(id);
  }

  async getOrdersByStatus(status) {
    return await Order.find({ status }).sort({ createdAt: -1 });
  }
}

export default new OrderService();