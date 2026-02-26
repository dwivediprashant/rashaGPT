import "dotenv/config";
import express from "express";
import chatRoutes from "./routes/chat.js";
import cors from "cors";
//------db----
import connectDB from "./db.js";
connectDB();
//---------
const app = express();
const port = process.env.PORT;
//middlewares
app.use(express.json());
app.use(cors());
//routes
app.use("/api", chatRoutes);

//listen fxn
app.listen(port, (req, res) => {
  console.log(`Server running at port ${port}`);
});
