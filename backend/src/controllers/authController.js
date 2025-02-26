const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma"); // Assuming you have Prisma client setup
const redisClient = require("../config/redis");

exports.register = async (req, res) => {
      try {
            const { username, email, password } = req.body;


            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) return res.status(400).json({ message: "User already exists" });


            const hashedPassword = await bcrypt.hash(password, 10);


            const user = await prisma.user.create({
                  data: { username, email, password: hashedPassword }
            });

            res.status(201).json({ message: "User registered successfully", user });
      } catch (error) {
            res.status(500).json({ message: "Error registering user", error: error.message });
      }
};

exports.login = async (req, res) => {
      try {
            const { email, password } = req.body;


            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) return res.status(404).json({ message: "User not found" });


            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

            // Store online status in Redis
            await redisClient.set(`online:${user.id}`, "true");

            res.status(200).json({ message: "Login successful", token, user });
      } catch (error) {
            res.status(500).json({ message: "Error logging in", error: error.message });
      }
};

exports.logout = async (req, res) => {
      try {
            const userId = req.user.id;

            // Remove user from Redis online status
            await redisClient.del(`online:${userId}`);

            res.status(200).json({ message: "Logout successful" });
      } catch (error) {
            res.status(500).json({ message: "Error logging out", error: error.message });
      }
};
