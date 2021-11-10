import express from "express";
import socketIO from "socket.io";
import logger from "morgan";
import { join } from "path";
import socketController from "./socketController";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) => res.render("home"));

const server = app.listen(PORT, () =>
  console.log(`✅ Server running: http://localhost:${PORT}`)
);
const io = socketIO(server);
io.on("connection", (socket) => socketController(socket, io));
