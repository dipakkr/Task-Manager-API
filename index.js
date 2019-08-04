import express from 'express';
import UserRouter from './api/UserRouter';
import TaskRouter from './api/TaskRouter';
import jwt from 'jsonwebtoken';
import './db/mongoose';

const app = express();

// Middleware
app.use(express.json());

// app.use((req, res, next)=>{
//     res.status(503).send({response : "Website is getting Updated !"});
//     next();
// });

  
// End Points
app.use('/user', UserRouter);
app.use('/task', TaskRouter);

//Server
app.listen(3000, (req, res)=>{
    console.log(`Server Started at PORT 3000`);
});