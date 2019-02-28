const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido!'
}

const Schema = mongoose.Schema;


const userSchema = new Schema ({

    name: {
        type: String,
        required: [true, 'Es necesario el nombre!']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario']    
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria!']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    state: {
        type: Boolean,
        default: true
    },
    totalDuration: {
        type: Number,
        default: 0
    },
    timePerProject: [{
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
        },
        duration: Number
    }],
    date: {
        type: String
    }
});

userSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;

}

userSchema.plugin(uniqueValidator, '{PATH} debe de ser unico');

module.exports = mongoose.model('User', userSchema);