import { Kafka } from "kafkajs";

const kafka = new Kafka({
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({
  groupId: "nodejs",
});

await consumer.subscribe({
  topic: "hello",
  fromBeginning: true,
});

await consumer.connect();

await consumer.run({
  eachMessage: async (record) => {
    const message = record.message;

    console.log(message.value.toString());
  },
});
