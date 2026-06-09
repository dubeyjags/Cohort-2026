import express from "express";
import dotenv from "dotenv";
import { createTodo, todos, deleteTodo } from "./store.js";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { onTodoCreated, onTodoDeleted } from "./inngest/function.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/inngest", serve({ client: inngest, functions: [onTodoCreated, onTodoDeleted] }));

app.post("/todos", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const todo = createTodo(title);
  await inngest.send({ name: "todo.created", data: { todo } });
  res.status(201).json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  deleteTodo(id);
  await inngest.send({ name: "todo.deleted", data: { id } });
  res.json({ message: "Todo deleted" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
