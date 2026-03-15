import {z} from "zod";

const envSchema = z.object({
  PORT: z.string().optional(),
  API_KEY: z.string().optional(),
});
function validateEnv(env: NodeJS.ProcessEnv) {
    const safeParsedEnv = envSchema.safeParse(process.env);
    if (!safeParsedEnv.success) throw new Error(safeParsedEnv.error.message);
    return safeParsedEnv.data;
}

export const env = validateEnv(process.env);