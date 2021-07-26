import * as express from "express";
import * as mongoose from "mongoose";
import { config } from "dotenv";
import { todoRouter } from "./routes/todo";
import * as cors from "cors";
import { join as joinPath } from "path";

config();

async function main() {
  const { CONN_STRING } = process.env;
  if (!CONN_STRING) {
    throw new Error("No connection string found!");
  }

  const app = express();
  app.use("/", express.static(joinPath(__dirname, "../site/build")));
  app.use(express.json());
  app.use(cors());

  await mongoose.connect(
    CONN_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (e) => console.log(e ? e : "Connected!")
  );

  const db = mongoose.connection;

  db.on("error", (e) => console.error(e));
  db.once("open", () => console.log("Connection was open"));

  app.use("/api", todoRouter);

  app.listen(3000, () => {
    console.log("Express server started on port 3000!");
  });
}

main().catch(console.error);
