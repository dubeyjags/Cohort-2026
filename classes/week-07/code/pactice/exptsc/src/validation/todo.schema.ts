import { z } from "zod";

export const todoSchema = z.object({
    id: z.string().describe("Unique identifier for the todo item"),
    title: z.string().describe("Title of the todo item"),
    description: z.string().describe("Description of the todo item").optional(),
    completed: z.boolean().describe("Completion status of the todo item").default(false),
});

export type ITodo = z.infer<typeof todoSchema>;