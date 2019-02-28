const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const taskSchema = new Schema ({

    name: {
        type: String,
    },
    timeTraking: {
        start: {
            type: Number,
            default: 0
        },
        pause: {
            type: Number,
            default: 0
        },
        duration: {
            type: Number,
            default: 0
        }
    },
    estimatedTime: {
        hours: {
            type: Number,
            default: 0
        },
        minutes: {
            type: Number,
            default: 0
        },
        seconds: {
            type: Number,
            default: 0
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El id del usuario es requerido']
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'El id del proyecto es requerido']
    },
    state: {
        type: Boolean,
        default: true
    },
    date: String
});


module.exports = mongoose.model('Task', taskSchema);