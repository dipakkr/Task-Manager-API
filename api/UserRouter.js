import express from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import '../db/mongoose';
import auth from '../middleware/auth';


const UserRouter = express.Router();

// @POST - /login - Login User

UserRouter.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        console.log(token);
        res.send({user, token}); 
    } catch (e) {
        res.status(400).send();
    }
});

// @POST - Register a User

UserRouter.post('/', async (req, res)=>{

    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        console.log(token);
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(e);
    }
});

// @GET - ALL USERS

UserRouter.get('/me', auth, async (req, res)=>{
   
    res.send(req.user);
    
    // try {
    //     const users = await User.find({});
    //     res.send(users);
    // } catch (e) {
    //     res.status(500).send();
    // }
});

// @GET - Unique User By ID

UserRouter.get('/:id', auth, async (req, res) => {
    
    const _id = req.params.id
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

// @PATCH - UPDATE ONE

UserRouter.patch('/:id', async (req, res)=>{

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findById(req.params.id);
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();

        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// @DELETE - Delete One

UserRouter.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

export default UserRouter;