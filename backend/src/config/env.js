import dotenv from "dotenv";

dotenv.config();

export const config = {
      PORT: process.env.PORT || 5000,
      DATABASE_URL: process.env.DATABASE_URL,
      REDIS_HOST: process.env.REDIS_HOST || "localhost",
      REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
      KAFKA_BROKERS: process.env.KAFKA_BROKERS ? process.env.KAFKA_BROKERS.split(",") : ["localhost:9092"],
      KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || "chat-app",
      KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID || "chat-group",
      JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
};
