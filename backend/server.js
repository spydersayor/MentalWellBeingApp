import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, sequelize } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import surveyRoutes from "./routes/survey.js";
import User from "./models/User.js";
import Survey from "./models/Survey.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors()); // in prod: configure origin
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/survey", surveyRoutes);

// Associations (do this after models are imported)
User.hasMany(Survey, { foreignKey: "userId" });
Survey.belongsTo(User, { foreignKey: "userId" });

// Sync DB (dev) — in production use migrations instead
sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database synced");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
