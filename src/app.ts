import createError from "http-errors";
import express, {Request,Response, NextFunction} from "express";
import * as path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from 'cors';
import indexRouter from "./routes/index";
import sendMainPage from "./routes/sendMainPage";

const app: express.Application = express();
const corsOptions = {
  origin: '*',
}
app.use(cors(corsOptions));
// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", indexRouter);
app.use("/", sendMainPage);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:any, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
