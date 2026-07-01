import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import startScheduler from "./src/cron/scheduler.cron.js";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    startScheduler();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();