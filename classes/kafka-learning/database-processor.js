import {kafkaClient} from './kafka-client.js';

async function main() {
  const kafkaConsumer = kafkaClient.consumer({ groupId: "location-updates-group" });
  await kafkaConsumer.connect();
  await kafkaConsumer.subscribe({ topic: "location-updates", fromBeginning: true });    
    kafkaConsumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat }) => {
            const locationUpdate = JSON.parse(message.value.toString());
            console.log("add into the DB:", locationUpdate);
            await heartbeat();
        },
    });
}

main().catch('db processor ',console.error);