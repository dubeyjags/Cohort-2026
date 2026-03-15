import { Router } from "express";
import TodoController from "./controller.js";

const router = Router();
const controller = new TodoController();

router.get("/", controller.handleGetAll.bind(controller));
router.post("/", controller.handleCreate.bind(controller));
    




export default router;