import type { Request, Response } from "express";
import type { ITodo } from "../../validation/todo.schema.js";
import { todoSchema } from "../../validation/todo.schema.js";

class TodoController {
    private _db: ITodo[];
    constructor() {
        this._db = [];
    }

    public handleGetAllTodos(req: Request, res: Response) {
        const todos = this._db;
        return res.json({ todos });
    }

    public async handleCreateTodo(req: Request, res: Response) {
        try {
            const inValided = req.body;
            const validationResult = await todoSchema.parseAsync(inValided);
            this._db.push(validationResult);
            return res.status(201).json({ todo: validationResult });
        } catch (error) {
            return res.status(400).json({ error: "Invalid todo data" });
        }
    }
}
export default TodoController;