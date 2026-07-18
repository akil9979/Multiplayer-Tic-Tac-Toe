import app from "./app";
import dotenv from "dotenv";
dotenv.config({});      

import  pool  from "./config/db";


let port = process.env.PORT;

pool.connect()
.then(() => {
    console.log("Database Connected");
})
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch(err => {
    console.log(err);
});

