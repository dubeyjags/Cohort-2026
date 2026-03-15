import http from "http";
import {env} from "./env.js";
import {createServerApplication} from "./app/index.js";
async function main() {
    try {
        const server = http.createServer(createServerApplication());
        const PORT: number = env.PORT ? parseInt(env.PORT) : 8080;
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

main();