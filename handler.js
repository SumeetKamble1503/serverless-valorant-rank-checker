import serverless from "serverless-http";
// import { urlencoded, json } from "body-parser";
import pkg from "body-parser";
const { urlencoded, json } = pkg;
import express, { json as _json } from "express";
import cors from "cors";
const app = express();
const _app = app;
export { _app as app };
import customMiddleware from "./src/middleware/customMiddleware.js";

app.use(
  urlencoded({
    extended: true,
    limit: "1000mb",
    parameterLimit: 50000000,
  })
);

app.use(json({ limit: "1000mb" }));
app.use(_json());
app.use(cors());
app.use(customMiddleware);
import routes from "./src/routes/routes.js";

app.use("/api/v1", routes);

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise --- reason:", reason);
});

app.all("*", (req, res) => {});

const handler = serverless(app);

const _handler = async (event, context, callback) => {
  /** Immediate response for WarmUP plugin */
  if (event.source === "serverless-plugin-warmup") {
    console.log("WarmUP - Lambda is warm!");
    return callback(null, "Lambda is warm!");
  }

  context.callbackWaitsForEmptyEventLoop = false;
  const result = await handler(event, context);
  return result;
};
export { _handler as handler };
