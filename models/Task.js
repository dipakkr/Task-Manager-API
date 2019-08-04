import mongoose from 'mongoose';

const getCurrentTimeStamp = () => {

    const date = new Date();
    const day = date.getDate();
    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const year = date.getFullYear();
    const currentMonth = monthName[date.getMonth()];

    const formattedDate =  `${day}-${currentMonth}-${year}`;
    return formattedDate;
}

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt : {
        type : String,
        default : getCurrentTimeStamp()
    }
});

export default Task;