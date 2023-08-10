import { config } from "dotenv";
config();
import express from "express";
import { applymiddlewares } from "./middlewares";
import { registerRoutes } from "./routes/routes.register";
import { connectDB } from "./DB/db.connect";

const app : express.Application = express();

//applymiddlewares
applymiddlewares(app);
//apply routers
registerRoutes(app);

const start = async ()=>{
    try {
        await connectDB();
        app.listen(3000, ()=>console.log('Server Started'))
    } catch(e) {
        console.log(e);
    }
};

start();