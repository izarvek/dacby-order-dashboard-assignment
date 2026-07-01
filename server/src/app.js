import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import orderRoute from "./routes/order.controller.js";
import schedulerRoute from "./routes/scheduler.controller.js";

const app = express()

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
}));
app.use(morgan("dev"));


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running 🚀",
  });
});

app.use("/api/orders" , orderRoute)
app.use("/api/scheduler", schedulerRoute);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;