import express from "express";
import type { Application } from "express";
import router from "./todo/routes.js";

function createServerApplication(): Application {
  const app = express();
  
  app.use(express.json());
  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });
  app.use("/todo", router);
  


  return app;
}

export { createServerApplication };