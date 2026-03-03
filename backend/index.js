import "dotenv/config";
import express from "express";
import session from "express-session";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import sessionOptions from "./config/session.js";
import corsOptions from "./config/cors.js";
//------db----
import connectDB from "./db.js";
connectDB();
//---------
const app = express();
const port = process.env.PORT;

//middlewares
app.use(session(sessionOptions));
app.use(express.json());
app.use(cors(corsOptions));

//routes
app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);


//No route match
app.use((req,res)=>{
    res.status(404).json({message:"Route not found"});
})

//error handler
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).json({message:err.message});
})
//listen fxn
app.listen(port, (req, res) => {
  console.log(`Server running at port ${port}`);
});
