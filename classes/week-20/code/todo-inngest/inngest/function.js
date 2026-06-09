import { inngest } from "./client.js";
import { auditlog } from "../store.js";

export const onTodoCreated = inngest.createFunction(
  { id: "on-todo-created", triggers: [{ event: "todo.created" }] },
  async ({ event, step }) => {
    await step.run("log-todo-created", async () => {
      auditlog.push({
        event: "todo.created",
        id: event.data.todo.id,
        title: event.data.todo.title,
        timestamp: new Date(),
      });
      console.log(`Todo created: ${event.data.todo.title}`);
      return { success: true };
    });
  },
);

export const onTodoDeleted = inngest.createFunction(
    { id: "on-todo-deleted", retries: 2, triggers: [{ event: "todo.deleted" }] },
    async ({ event, step, attempt }) => {
        await step.run("log-todo-deleted", async () => {
            if (attempt === 0) {
                throw new Error("Simulated failure on first attempt");
            }
            console.log(`Todo deleted: ${event.data.id}`);
            return { success: true };
        });

        await step.run("audit", async () => {
            auditlog.push({
                action: "delete",
                id: event.data.id,
            });
            console.log(`Todo deleted: ${event.data.id}`);
            return { success: true };
        });
    }
);
