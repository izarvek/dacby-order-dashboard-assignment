const authScheduler = (req, res, next) => {
  try {
    const secretKey = req.headers["x-secret-key"];

    if (!secretKey) {
      return res.status(401).json({
        success: false,
        message: "Scheduler secret key is required.",
      });
    }

    if (secretKey !== process.env.SCHEDULER_SECRET_KEY) {
      return res.status(403).json({
        success: false,
        message: "Invalid scheduler secret key.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
      error: error.message,
    });
  }
};

export default authScheduler;