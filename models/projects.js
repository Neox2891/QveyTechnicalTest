const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const projectSchema = new Schema ({

    name: {
        type: String,
        required: [true, 'El nombre es requerido!'],
        unique: true
    },
    time: {
        hours: Number,
        minutes: Number,
        seconds: Number,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    duration: {
        type: Number,
        default: 0
    },
    state: {
        type: Boolean,
        default: true
    }
});


module.exports = mongoose.model('Project', projectSchema);