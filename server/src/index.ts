import { createServer } from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import WebSocketsConfiguration from "./config/web-sockets";

dotenv.config();
const app = express();
const server = createServer(app);
WebSocketsConfiguration(server);

// Loading middlewares
app.use(morgan("dev"));
app.use(cors());

// Loading routes
console.log("Loading routes...");
const routesPath = path.join(__dirname, "routes");
Promise.all(
  fs.readdirSync(routesPath).map(async (filename) => {
    try {
      const routeFile = path.join(routesPath, filename);
      const routeFilename = path.parse(routeFile).name;
      const routeUrl = routeFilename == "index" ? "" : routeFilename;
      const route = await import(routeFile);
      app.use(`/${routeUrl}`, route.default);
      console.log(`Route /${routeUrl} loaded correctly`);
    } catch (error: any) {
      console.log(
        `Error trying to load routes file ${filename}: ${error.message}`
      );
    }
  })
).then(() => {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
