require("dotenv").config();
const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./utils/db");
const cors = require("cors");
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;
const process = require("process");
var cron = require("node-cron");
const { notifyBookDefaulties } = require("./utils/automaticMailSender");
const {
  automaticSubscriptionReminder,
} = require("./utils/automatedSubscriptionNotifier");
const port = process.env.PORT;

if (cluster.isPrimary) {
  // this schedules a job at 10:00 am everyday
  cron.schedule("00 10 * * *", async function () {
    await notifyBookDefaulties();
  });

  // this schedulea job at 00.00 am everday to send reminder email whose subscription has expired
  cron.schedule("00 00 * * *", async function () {
    await automaticSubscriptionReminder();
  });

  // console.log(`Number of CPUs is ${totalCPUs}`);
  // console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  // if any worker dies fork a new worker
  cluster.on("exit", (worker, code, signal) => {
    // console.log(`worker ${worker.process.pid} died`);
    // console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  connectDB();

  const app = express();

  const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 204,
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/api/admin", require("./routes/adminRoutes"));
  app.use("/api/user", require("./routes/userRoutes"));
  app.use("/api/actions", require("./routes/authRoute"));

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Running on ${port}`);
  });
}
