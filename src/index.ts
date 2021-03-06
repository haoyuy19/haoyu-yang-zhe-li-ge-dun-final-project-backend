import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { NOT_FOUND } from "http-status-codes";
import HttpException from "./exceptions/HttpException";
import errorMiddleware from "./middlewares/error.middleware";
import * as userController from "./controllers/User";
// import * as postController from "./controllers/Post";
import "dotenv/config";
// import bodyParser from "body-parser";

const app: Express = express();

// app.use(bodyParser.json());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "hello world"
  });
});

app.post("/users/register", userController.postRegister);
app.post("/users/login", userController.postLogin);

// app.get("/posts", postController.getPosts);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error: HttpException = new HttpException(NOT_FOUND, "Router Not Found");
  next(error);
});

app.use(errorMiddleware);

const port: any = process.env.PORT || 6060;

const main = async () => {




  
  // const mongoDBEndpoint = "mongodb+srv://dung:data@cluster0.rcs8r.mongodb.net/<dbname>?retryWrites=true&w=majority";
  //     mongoose.connect(mongoDBEndpoint, {useNewUrlParser: true});
  //     const db = mongoose.connection;
  //     db.on('error', console.error.bind(console, 'Error connecting to mongodb'));


  mongoose.set("useCreateIndex", true);
  await mongoose.connect("mongodb://localhost:27017/tsexpress", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
  });
};

main();
