import api from "./axios";

export const runScheduler = () =>
  api.post(
    "/scheduler/run",
    {},
    {
      headers: {
        "x-secret-key":
          import.meta.env.VITE_SCHEDULER_KEY,
      },
    }
  );