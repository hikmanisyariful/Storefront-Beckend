import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app: express.Application = express();
const address = "0.0.0.0:3001";

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.listen(3001, () => {
  console.log(`starting app on: ${address}`);
});
