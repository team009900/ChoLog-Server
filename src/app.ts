import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as morgan from "morgan";
import * as helmet from "helmet";
import * as passport from "passport";
import * as createError from "http-errors";

// import { isLoggedIn } from "./middlewares";

import * as routes from "./routes";
// import * passportConfig from './passport'

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

// app.use(passport.initialize()); // 요청(req 객체)에 passport 설정을 심는 미들웨어
// app.use(passport.session()); // req.session 객체에 passport 정보를 저장하는 미들웨어

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json("Success");
});

// Routes
// app.post(
//   "/verify",
//   verifyToken,
//   (req: express.Request, res: express.Response) => {
//     res.send("Verified");
//   },
// );

// ? isLoggedIn 구현 전 임시 함수
const isLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  next();
};

app.use("/auth", routes.auth);
app.use("/diary", isLoggedIn, routes.diary);
app.use("/parameters", isLoggedIn, routes.parameters);
app.use("/plant", isLoggedIn, routes.plant);
app.use("/plantsdb", isLoggedIn, routes.plantsdb);
app.use("/user", isLoggedIn, routes.user);

// 404 - 라우터에 등록되지 않은 주소로 요청이 들어올 때 발생
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError(404));
  },
);

// Errorhandler - 404 에러를 만들어내는 미들웨어(404 에러 핸들링)
app.use((err: any, req: express.Request, res: express.Response) => {
  // 개발 환경 로컬에서만 에러 제공
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // 에러페이지 랜더
  res.status(err.status || 500).send(err.message || "SERVER ERROR!");
  res.render("error");
});

app.set("port", port);
app.listen(app.get("port"), () => {
  console.log(`app is listening in PORT ${app.get("port")}`);
});

module.exports = app;
