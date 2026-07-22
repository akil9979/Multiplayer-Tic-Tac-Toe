import app from "./app";
import dotenv from "dotenv";
dotenv.config({});   
import { createServer } from "http";   

import  pool  from "./config/db";
import { initializeSocket } from "./sockets/socket";


const port = process.env.PORT;

const httpServer = createServer(app);

const io = initializeSocket(httpServer);

pool.connect()
.then(() => {
    console.log("Database Connected");
})
.then(() => {
    httpServer.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch(err => {
    console.log(err);
});

