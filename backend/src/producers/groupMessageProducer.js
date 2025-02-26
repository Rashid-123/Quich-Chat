const { groupMessageProducer } = require("../config/kafka");

const sendGroupMessageToKafka = async (messageData) => {
      try {
            await groupMessageProducer.send({
                  topic: "group-messages",
                  messages: [{ value: JSON.stringify(messageData) }],
            });

            console.log("📤 Group Message sent to Kafka:", messageData);
      } catch (error) {
            console.error("❌ Error sending group message to Kafka:", error);
      }
};

module.exports = sendGroupMessageToKafka;
