import { z } from 'zod';
export const todoSchema = z.object({
    id: z.number().describe("Unique identifier for the todo item"),
    title: z.string().describe("Title of the todo item"),
    description: z.string().describe("Description of the todo item").optional(),
    completed: z.boolean().default(false).describe("Completion status of the todo item"),
});

export type TODO = z.infer<typeof todoSchema>;