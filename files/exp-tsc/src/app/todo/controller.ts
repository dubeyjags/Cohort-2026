import type { Request,Response } from 'express';
import { TODO,todoSchema } from "../validation/todo.schema.js";
class TodoController {
    private _db: TODO[];
    constructor() {
        this._db = [];
    }
    public handleGetAll(req: Request, res: Response) {
        const todos = this._db;
        return res.json(todos);
    }

    public async handleCreate(req: Request, res: Response) {
      try {
            const unvalidated = req.body;
            const validatedResult = await todoSchema.parseAsync(unvalidated); 
            this._db.push(validatedResult);
            return res.status(201).json(validatedResult);
        
      } catch (error) {
        return res.status(400).json({ error: error instanceof Error ? error.message : "Unknown error" });
      }
    }

    public handleDelete(req: Request, res: Response) {
        const id = req.params.id;
        const index = this._db.findIndex(todo => todo.id === id);
        if (index === -1) {
            return res.status(404).json({ error: "Todo not found" });
        }
        this._db.splice(index, 1);
        return res.status(204).send();
    }

    
  
}

export default TodoController;