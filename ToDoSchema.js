const {Schema, model} = require('mongoose');
const { randomUUID } =  require('crypto');

const todoSchema = new Schema({
    id : {
        type : String,
        unique : true,
        default : () => {
            return randomUUID();
        }
    },
    date: {
        type : String,
        required : true,
        default: () => new Date().toISOString().slice(0, 10)
    },
    task:{
        type: String
    }, 
    completeTask : {
        type : Boolean,
        default : false
    },
}, {id: false})

const todoModel = new model("ToDo", todoSchema);
module.exports = todoModel;