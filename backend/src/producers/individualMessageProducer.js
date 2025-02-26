const { individualMessageProducer } = require("../config/kafka");

const sendIndividualMessageToKafka = async (messageData) => {
      try {
            await individualMessageProducer.send({
                  topic: "individual-messages",
                  messages: [{ value: JSON.stringify(messageData) }],
            });

            console.log("📤 Individual Message sent to Kafka:", messageData);
      } catch (error) {
            console.error("❌ Error sending individual message to Kafka:", error);
      }
};

module.exports = sendIndividualMessageToKafka;
