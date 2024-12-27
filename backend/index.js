import { connectDb } from './db/index.js';
import dotenv from "dotenv"
import {app} from  './app.js'
dotenv.config({
    path: "./.env"
})

connectDb()
.then(()=>{
    app.on('error', (err)=> {
        console.error(' Database is Working but Server Error', err);
    })
    app.listen(3000, ()=>{
        console.log('Server is running on port 3000');
    })

    app.get('/', (req, res)=> {
        res.json({
            message: "Appication is working good!",
        });
    });
}).catch((err)=>{
    console.error('Failed to connect to DB', err);
})


