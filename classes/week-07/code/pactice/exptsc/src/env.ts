import {z} from "zod";

const envSchema = z.object({
  PORT: z.string().optional(),
  API_KEY: z.string().optional(),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);
  if (!safeParseResult.success)  throw new Error(`Invalid environment variables: ${JSON.stringify(safeParseResult.error.issues)}`);
  return safeParseResult.data;
}

export const env = createEnv(process.env);