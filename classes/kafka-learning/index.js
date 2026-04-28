import http from "node:http";
import express from "express";
import { Server } from "socket.io";
import path from "node:path";
import { kafkaClient } from "./kafka-client.js";

async function main() {
  const PORT = process.env.PORT || 3000;
  const app = express();
  const server = http.createServer(app);
  const io = new Server();

  const kafkaProducer = kafkaClient.producer();
  await kafkaProducer.connect();

  const kafkaConsumer = kafkaClient.consumer({ groupId: "location-updates-group" });
  await kafkaConsumer.connect();
  await kafkaConsumer.subscribe({ topic: "location-updates", fromBeginning: true });
    kafkaConsumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat }) => {
        const locationUpdate = JSON.parse(message.value.toString());
        console.log("Received location update from Kafka:", locationUpdate);
        io.emit("client-location-update", {
          id: locationUpdate.id,
          latitude: locationUpdate.latitude,
          longitude: locationUpdate.longitude,
        });
        await heartbeat();
      },
    });

  app.use(express.static(path.resolve("./public")));

  io.attach(server);

  io.on("connection", (socket) => {
    console.log(`a user connected: ${socket.id}`);

    socket.on("client-location-update", (location) => {
      console.log("Received client location:", location);
      const { latitude, longitude } = location;
      socket.broadcast.emit("client-location-update", {id: socket.id, latitude, longitude });
      kafkaProducer.send({
        topic: "location-updates",
        messages: [
          {
            key: socket.id,
            value: JSON.stringify({
              id: socket.id,
              latitude,
              longitude,
              timestamp: Date.now(),
            }),
          },
        ],
      });
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  app.get("/health", (req, res) => {
    return res.status(200).json({ status: "ok" });
  });

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}
main();
