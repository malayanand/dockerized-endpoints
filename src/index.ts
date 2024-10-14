import express, { Express, Request, Response } from "express";
import cors from "cors";
import accountRoutes from "./routes/transactions";

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
// Cors
app.use(cors());

// basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to VISA");
});

//routes
app.use("/api", accountRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
