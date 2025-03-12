import mongoose from "mongoose";

const { Schema, models, model, ObjectId } = mongoose


const UserSchema = new Schema({
    username: {type: String, required: true, unique: true, uppercase: true},
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    pass: {type: String, required: true},
    compras: [{type: ObjectId, ref: "sales"}]
}, {timestamps: true})

const User = models.user || model('user', UserSchema)

export default User