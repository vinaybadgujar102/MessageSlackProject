import express from "express";
import { PORT } from "./config/serverConfig";
import { StatusCodes } from "http-status-codes";

const app = express();

app.get("/ping", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "pong" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
