import mongoose from 'mongoose';

// DB Connect
mongoose.connect('mongodb://localhost:27017/Auth', {useNewUrlParser : true});

// Database Connection
var db = mongoose.connection;
db.on('error', (err) => {
    console.log('Connection eroor', err); 
});
db.once('open', ()=>{
    console.log('Connected');
});

export default mongoose;