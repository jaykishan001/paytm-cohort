import express from 'express';
import cors from 'cors';
const app = express ();
import cookieParser from 'cookie-parser';


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

import signInRoutes from './routes/signIn.routes.js';
import accountRoutes from './routes/account.routes.js';


app.get("/test", (req, res)=> {
    res.json({
      message: "Welcome to API",
      success: true,
    })
})
app.use("/api/v1/user/", signInRoutes);

app.use("/api/v1/account", accountRoutes);


export {app};