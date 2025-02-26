const { Kafka } = require("kafkajs");
const { KAFKA_BROKER } = require("./env");

const kafka = new Kafka({
      clientId: "chat-app",
      brokers: [KAFKA_BROKER],
});

// ✅ Producers for two topics
const individualMessageProducer = kafka.producer();
const groupMessageProducer = kafka.producer();

// ✅ Consumers for two topics
const individualMessageConsumer = kafka.consumer({ groupId: "individual-message-group" });
const groupMessageConsumer = kafka.consumer({ groupId: "group-message-group" });

const connectKafka = async () => {
      try {
            await individualMessageProducer.connect();
            await groupMessageProducer.connect();
            await individualMessageConsumer.connect();
            await groupMessageConsumer.connect();

            console.log("✅ Kafka Producers and Consumers Connected");

            // Subscribe to individual messages
            await individualMessageConsumer.subscribe({ topic: "individual-messages", fromBeginning: true });

            // Subscribe to group messages
            await groupMessageConsumer.subscribe({ topic: "group-messages", fromBeginning: true });

      } catch (error) {
            console.error("❌ Kafka Connection Error:", error);
      }
};

module.exports = {
      kafka,
      individualMessageProducer,
      groupMessageProducer,
      individualMessageConsumer,
      groupMessageConsumer,
      connectKafka,
};
