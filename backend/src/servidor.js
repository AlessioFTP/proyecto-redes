import express from "express";
import http from "http";
import { Server as servidorSocket } from "socket.io";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import routerAutenticar from "./routes/autenticar.routes.js";

import { setIO } from "./libs/socket.js";
import configurarSocket from "./controllers/socket.controller.js"; 

const app = express();
const servidorHTTP = http.createServer(app); 

const io = new servidorSocket(servidorHTTP, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

setIO(io);

configurarSocket(io);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routerAutenticar);

export default servidorHTTP;
