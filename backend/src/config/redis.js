import { createClient } from "redis";

const redisClient = createClient({
      socket: {
            host: process.env.REDIS_HOST || "localhost",
            port: Number(process.env.REDIS_PORT) || 6379,
      },
});

redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

(async () => {
      await redisClient.connect();
      console.log("✅ Redis Connected to", process.env.REDIS_HOST);
})();

export default redisClient;
