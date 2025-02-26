const { groupMessageConsumer } = require("../config/kafka");
const { prisma } = require("../config/prisma"); // Import Prisma client

const startGroupMessageConsumer = async () => {
      try {
            await groupMessageConsumer.subscribe({ topic: "group-messages", fromBeginning: false });

            await groupMessageConsumer.run({
                  eachMessage: async ({ topic, partition, message }) => {
                        const msgData = JSON.parse(message.value.toString());
                        console.log(`📩 [Group] New Message:`, msgData);

                        const { senderId, groupId, content } = msgData;

                        // Store message in the database using Prisma
                        await prisma.message.create({
                              data: {
                                    senderId,
                                    groupId,
                                    content,
                              },
                        });

                        console.log(`✅ [Group] Message stored in DB`);
                  },
            });

            console.log("✅ Group Message Consumer is running...");
      } catch (error) {
            console.error("❌ Group Message Consumer Error:", error);
      }
};

module.exports = startGroupMessageConsumer;
