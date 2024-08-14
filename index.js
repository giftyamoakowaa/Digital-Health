import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors"
import expressOasGenerator from "express-oas-generator";
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routes/user_routes.js";
import adminRouter from "./routes/Admin_route.js";
import DoctorRouter from "./routes/Doctors_routes.js";


const app = express();

//Applying middleware
app.use(cors({credentials: true, origin: '*'}));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
//   cookie: { secure: true },

   store: MongoStore.create({
      mongoUrl: process.env.Mongo_Url
})

})
)

expressOasGenerator.handleResponses(app,{
    alwaysServeDocs: true,
    tags: ["auth", "user", "admin", "Doctor"],
    mongooseModels: mongoose.modelNames(),
});

dbConnection();

app.use('/api',userRouter);
app.use( '/api',  adminRouter);
app.use( '/api' , DoctorRouter);

expressOasGenerator.handleRequests();
app.use((req,res) => res.redirect("/api-docs"));



app.listen(3400, ()=>
console.log('Server is running'));