import { Express } from "express";
import path from "path";
import fs from "fs";

export default async function RoutesConfig(app: Express) {
  console.log("Loading routes...");
  const routesPath = path.join(__dirname, "../routes");
  await Promise.all(
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
  );
}
