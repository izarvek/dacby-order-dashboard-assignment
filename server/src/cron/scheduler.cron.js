import cron from "node-cron";
import schedulerService from "../services/scheduler.service.js";

const startScheduler = () => {
  cron.schedule("*/5 * * * *", async () => {
    console.log("Running scheduler...");

    try {
      await schedulerService.runScheduler();
      console.log("Scheduler completed.");
    } catch (error) {
      console.error("Scheduler failed:", error.message);
    }
  });
};

export default startScheduler;