import mongoose from "mongoose";

const schedulerLogSchema = new mongoose.Schema(
  {
    startedAt: {
      type: Date,
      required: true,
    },

    completedAt: {
      type: Date,
    },

    totalOrders: {
      type: Number,
      default: 0,
    },

    updatedOrders: {
      type: Number,
      default: 0,
    },

    failedOrders: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      required: true,
    },

    message: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("SchedulerLog", schedulerLogSchema);