import express from "express";
import schedulerController from "../controllers/scheduler.controller.js";
import authScheduler from "../middleware/authScheduler.js";

const router = express.Router();

router.post("/run", authScheduler, schedulerController.runScheduler);
  
export default router;