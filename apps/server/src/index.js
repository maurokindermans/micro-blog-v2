import express from "express";
import dotenv from "dotenv";
import entryController from "./controller/entry.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

function checkCORS(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  } else {
    next();
  }
}

app.use(checkCORS);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express Server");
});

app.get("/entries", entryController.get);

app.post("/entries", entryController.post);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
