import { Kafka } from "kafkajs";

export const kafkaClient = new Kafka({
  clientId: "familyLocation",
  brokers: ["localhost:9092"],
});
