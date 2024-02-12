import { createServer } from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import WebSocketsConfiguration from "./config/web-sockets";
import RoutesConfig from "./config/routes";

dotenv.config();
const app = express();
const server = createServer(app);
WebSocketsConfiguration(server);

// Loading middlewares
app.use(morgan("dev"));
app.use(cors());

// Loading routes
RoutesConfig(app).then(() => {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
