import http from "node:http";
import path from "node:path";

import express from "express";
import { Server } from "socket.io";
import { publisher, subscriber, redis } from "./redis-connecttion.js";

const CHECKBOXES_COUNT = 500;
const CHECKBOXES_KEY = "checkboxes-state";

let state = new Array(CHECKBOXES_COUNT).fill(false);

const rateLimitingHashMap = new Map();

async function main() {
  const PORT = process.env.PORT || 8000;

  const app = express();
  const server = http.createServer(app);
  const io = new Server();
  io.attach(server);

  const existingState = await redis.get(CHECKBOXES_KEY);
  if (existingState) {
    state = JSON.parse(existingState);
  } else {
    await redis.set(CHECKBOXES_KEY, JSON.stringify(state));
  }

  await subscriber.subscribe("internal-server-checkbox-changed");

  subscriber.on("message", (channel, message) => {
    if (channel === "internal-server-checkbox-changed") {
        const { index, checked } = JSON.parse(message);
        console.log("Received message from Redis:", { index, checked });
        state[index] = checked;
        io.emit("server-checkbox-changed", { index, checked });
    }
  });

  // Socket.io Handlers and Middlewares
  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
      rateLimitingHashMap.delete(socket.id);
    });

    socket.on("client-checkbox-changed", async (data) => {
      try {
        console.log("client-checkbox-changed", data);
        
        // Validate data
        if (typeof data.index !== 'number' || typeof data.checked !== 'boolean' || data.index < 0 || data.index >= CHECKBOXES_COUNT) {
          socket.emit("error", { message: "Invalid checkbox index" });
          return;
        }

        // Rate limiting
        const lastOperationTime = rateLimitingHashMap.get(socket.id) || 0;
        if (lastOperationTime) {
          const timeElapsed = Date.now() - lastOperationTime;
          if (timeElapsed < 5000) {
            socket.emit("rate-limit-warning", {
              message: "Too quickly. Please wait before making more changes.",
            });
            return;
          }
        }
        rateLimitingHashMap.set(socket.id, Date.now());

        // Update state in Redis
        let existingState = await redis.get(CHECKBOXES_KEY);
        if (!existingState) {
          existingState = JSON.stringify(new Array(CHECKBOXES_COUNT).fill(false));
        }
        
        const parsedState = JSON.parse(existingState);
        parsedState[data.index] = data.checked;
        await redis.set(CHECKBOXES_KEY, JSON.stringify(parsedState));

        // Broadcast change to all clients
        await publisher.publish(
          "internal-server-checkbox-changed",
          JSON.stringify(data),
        );
      } catch (error) {
        console.error("Error handling checkbox change:", error);
        socket.emit("error", { message: "Failed to update checkbox" });
      }
    });
  });

  // Express Handlers and Middlewares
  app.use(express.static(path.resolve("public")));

  app.get("/health", (req, res) => {
    res.json({ message: "healthy" });
  });

  app.get("/checkboxes", async (req, res) => {
    return res.json({
      checkboxes: state,
    });
  });

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
