import { kafkaClient } from "./kafka-client.js";

async function main() {
  const admin = kafkaClient.admin();
  console.log("Connecting to Kafka...");
  await admin.connect();
  console.log("Connected to Kafka");
  await admin.createTopics({
    topics: [
      { topic: 'locations-updates', numPartitions: 2 }
    ]
  });
  await admin.disconnect();
}

main();