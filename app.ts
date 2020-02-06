import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as morgan from "morgan";
import * as helmet from "helmet";
import { checkAuthentication } from "./middlewares";
import * as indexRouter from "./routes";

const app = express();
const port = 4000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.NODE_ENV
      ? process.env.PROD_CORS_ORIGIN
      : "http://localhost:8081", // 추후 변경(핼프데스크 질문)
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  }),
);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(helmet());
} else {
  app.use(morgan("dev"));
}

app.get("/", (req: any, res: any) => {
  res.status(200).json("Success");
});

// ? auth check and routing
app.use("/", checkAuthentication, indexRouter);

// todo: error catch

app.set("port", port);
app.listen(app.get("port"), () => {
  console.log(`app is listening in PORT ${app.get("port")}`);
});

module.exports = app;
