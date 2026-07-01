import Order from "../models/Order.js";
import StatusHistory from "../models/status.history.model.js";
import SchedulerLog from "../models/schedulerlog.model.js";

class SchedulerService {
  async runScheduler() {
    const log = await SchedulerLog.create({
      startedAt: new Date(),
      status: "SUCCESS",
    });

    try {
      const now = new Date();

      let updatedOrders = 0;

      const placedOrders = await Order.find({
        status: "PLACED",
      });

      for (const order of placedOrders) {
        const ageInMinutes =
          (now.getTime() - order.createdAt.getTime()) / (1000 * 60);

        if (ageInMinutes >= 10) {
          const oldStatus = order.status;

          order.status = "PROCESSING";
          await order.save();

          await StatusHistory.create({
            orderId: order._id,
            oldStatus,
            newStatus: "PROCESSING",
            changedBy: "SYSTEM",
          });

          updatedOrders++;
        }
      }

      const processingOrders = await Order.find({
        status: "PROCESSING",
      });

      for (const order of processingOrders) {
        const ageInMinutes =
          (now.getTime() - order.updatedAt.getTime()) / (1000 * 60);

        if (ageInMinutes >= 20) {
          const oldStatus = order.status;

          order.status = "READY_TO_SHIP";
          await order.save();

          await StatusHistory.create({
            orderId: order._id,
            oldStatus,
            newStatus: "READY_TO_SHIP",
            changedBy: "SYSTEM",
          });

          updatedOrders++;
        }
      }

      log.completedAt = new Date();
      log.totalOrders = placedOrders.length + processingOrders.length;
      log.updatedOrders = updatedOrders;
      log.failedOrders = 0;
      log.status = "SUCCESS";
      log.message = "Scheduler executed successfully.";

      await log.save();

      return {
        success: true,
        updatedOrders,
      };
    } catch (error) {
      log.completedAt = new Date();
      log.status = "FAILED";
      log.message = error.message;

      await log.save();

      throw error;
    }
  }
}

export default new SchedulerService();