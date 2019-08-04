import express from 'express';
import '../db/mongoose';
import Task from '../models/Task';
const TaskRouter = express.Router();

// @POST - Create Task
TaskRouter.post('/', async (req, res)=>{

    const task = new  Task(req.body);
    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(500).send(e);
    }
});

// @GET - ALL Task

TaskRouter.get('/', async (req, res)=>{
   try{
       const tasks = await Task.find({});
       res.status(201).send(tasks);
   }catch(e){
       res.status(400).send(e);
   }
});

// @GET - Fetch using task id

TaskRouter.get('/:id', async (req, res)=>{
    
    const _id = req.params.id;
    try{
        const task = await Task.findById(_id);
        if(!task) {
            return res.status(404).send(e);
        }
    }catch(e){
        res.status(500).send(e);
    }
});

// @PATCH - Update Using Id

TaskRouter.patch('/:id', async (req, res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    
    try{
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new : true});

        const task = await Task.findById(req.params.id);
        updates.forEach(update => task[update] = req.body[update]);
        await task.save();

        if(!task){
            return res.status(404).send({response : "Task Not Found"});
        }
        res.send(task);
    }catch(e){
        res.status(500).send({response : "Error in Update"});
    }
});

// @DELETE - Delete Task Using Id

TaskRouter.delete('/:id', async (req, res)=>{

    const _id = req.params.id;
    try{
        const task = await Task.findByIdAndDelete(_id);
        if(!task) {
            return res.status(404).send({"response" : "Task not Found"});
        } 
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
});

export default TaskRouter;