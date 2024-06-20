import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose";
import AuthRoute from './routes/authroutes.js'
import AdminRoute from './routes/adminroutes.js'
import UserRoute from './routes/userroutes.js'
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
dotenv.config();
app.use(cors());
app.use("/auth",AuthRoute);//Authentication routes
app.use("/admin", AdminRoute);//Admin Routes
app.use("/api",UserRoute) // User Routes

app.get('/',(req,res)=>{
    res.json({message:"Hello"})
})

const PORT = 5000;

/*Connecting to MongoDB Database*/
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
})
.catch((error)=>console.log(`${error} did not connect`));