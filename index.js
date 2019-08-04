import express from 'express';
import UserRouter from './api/UserRouter';
import TaskRouter from './api/TaskRouter';
import jwt from 'jsonwebtoken';
import './db/mongoose';

const app = express();

// Middleware
app.use(express.json());

// End Points
app.use('/user', UserRouter);
app.use('/task', TaskRouter);

const generateToken = async () =>{
    const token = jwt.sign({_id : 'hello123'}, 'thisisnewcourse', {expiresIn : "5 seconds"});
    console.log(token);

    setTimeout(()=>{
        const data = jwt.verify(token, 'thisisnewcourse');
        console.log(data);
    }, 3000);
}

generateToken();

//Server
app.listen(3000, (req, res)=>{
    console.log(`Server Started at PORT 3000`);
});