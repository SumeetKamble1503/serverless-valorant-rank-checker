const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
module.exports.app = app;
const customMiddleware = require("./src/middleware/customMiddleware");

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "1000mb",
    parameterLimit: 50000000,
  })
);

app.use(bodyParser.json({ limit: "1000mb" }));
app.use(express.json());
app.use(cors());
app.use(customMiddleware);
const routes = require("./src/routes/routes");

app.use("/api/v1", routes);

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise --- reason:", reason);
});

app.all("*", (req, res) => {});

const handler = serverless(app);

module.exports.handler = async (event, context, callback) => {
  /** Immediate response for WarmUP plugin */
  if (event.source === "serverless-plugin-warmup") {
    console.log("WarmUP - Lambda is warm!");
    return callback(null, "Lambda is warm!");
  }

  context.callbackWaitsForEmptyEventLoop = false;
  const result = await handler(event, context);
  return result;
};
