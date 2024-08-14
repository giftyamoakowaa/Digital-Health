import express from "express"
import { dbConnection } from "./config/db.js";

const app = express();

dbConnection();



app.listen(3400, ()=>
console.log('Server is running'));