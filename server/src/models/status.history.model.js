import mongoose from "mongoose";

const statusHistorySchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    oldStatus: {
      type: String,
      required: true,
      enum: [
        "PLACED",
        "PROCESSING",
        "READY_TO_SHIP",
        "SHIPPED",
        "DELIVERED",
      ],
    },

    newStatus: {
      type: String,
      required: true,
      enum: [
        "PLACED",
        "PROCESSING",
        "READY_TO_SHIP",
        "SHIPPED",
        "DELIVERED",
      ],
    },

    changedBy: {
      type: String,
      enum: ["SYSTEM", "ADMIN"],
      default: "SYSTEM",
    },

    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("StatusHistory", statusHistorySchema);