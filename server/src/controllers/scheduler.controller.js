import schedulerService from "../services/scheduler.service.js";

class SchedulerController {
  async runScheduler(req, res, next) {
    try {
      const result = await schedulerService.runScheduler();

      return res.status(200).json({
        success: true,
        message: "Scheduler executed successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new SchedulerController();