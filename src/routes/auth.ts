import { Router } from "express";
import jwt from "jsonwebtoken";
import TokenPayload from "../types/TokenPayload";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const router = Router();

// TODO: remove mock data after connecting to database
type User = { _id: string; username: string; password: string };
const users: User[] = [{ _id: "1", username: "test", password: "123321" }];
const tokens = ["1"];

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    const user = users.find((u) => u.username === username);

    if (user == null || user.password !== password) {
      res.status(401).json({ error: "Wrong username or password" });
      return;
    }

    const payload = {
      user: {
        _id: user._id,
      },
    };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET!, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET!);

    const userWithoutPassword = { _id: user._id, username: user.username };
    res.json({ user: userWithoutPassword, accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/logout", (req, res) => {
  const { refreshToken } = req.body;

  try {
    const token = tokens.find((t) => t === refreshToken);

    if (!token) {
      res.status(404).json({ error: "Token not found" });
      return;
    }

    tokens.filter((t) => token !== t);
    res.status(204).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({ error: "Refresh token is required" });
    return;
  }

  try {
    const token = tokens.find((t) => t === refreshToken);

    if (!token) {
      res.status(404).json({ error: "Token not found" });
      return;
    }

    const { user } = jwt.verify(token, REFRESH_TOKEN_SECRET!) as TokenPayload;

    const accessToken = jwt.sign({ user }, ACCESS_TOKEN_SECRET!, {
      expiresIn: "10m",
    });

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
