import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 4002;
export const MONGODB_URI = process.env.MONGO || "mongodb+srv://ted:ted2022@TED.asa9o.mongodb.net/TED";
