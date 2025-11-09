import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";

const PORT = process.env.PORT || 3000;

const allowedOrigins = ["http://localhost:5173"];

const app = express();
app.use(express.json());
app.use(cors({ origin: allowedOrigins }));

app.use("/auth", authRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
