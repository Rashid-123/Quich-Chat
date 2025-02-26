const { individualMessageConsumer } = require("../config/kafka");
const { prisma } = require("../config/prisma"); // Import Prisma client

const startIndividualMessageConsumer = async () => {
      try {
            await individualMessageConsumer.subscribe({ topic: "individual-messages", fromBeginning: false });

            await individualMessageConsumer.run({
                  eachMessage: async ({ topic, partition, message }) => {
                        const msgData = JSON.parse(message.value.toString());
                        console.log(`📩 [Individual] New Message:`, msgData);

                        const { senderId, receiverId, content } = msgData;

                        // Store message in the database using Prisma
                        await prisma.message.create({
                              data: {
                                    senderId,
                                    receiverId,
                                    content,
                              },
                        });

                        console.log(`✅ [Individual] Message stored in DB`);
                  },
            });

            console.log("✅ Individual Message Consumer is running...");
      } catch (error) {
            console.error("❌ Individual Message Consumer Error:", error);
      }
};

module.exports = startIndividualMessageConsumer;
