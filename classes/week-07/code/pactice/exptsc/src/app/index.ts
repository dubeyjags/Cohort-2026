import express from "express";
import type { Application } from "express";
import todoRoutes from "./todo/routes.js";

function createServerApp(): Application {
    const app = express();

    app.use(express.json());
    app.use("/api/todos", todoRoutes);

    return app;
}



export { createServerApp };
// this file is only update if we use another thing except express. For example, if we want to use Koa instead of Express, we would update this file to create and configure a Koa application instead.
// this is the main entry point of our application. It will be responsible for creating and configuring the Express application, and then exporting it for use in other parts of the application.   
// The createServerApp function initializes an Express application and returns it. This allows us to keep our server setup modular and organized, making it easier to manage as our application grows.
