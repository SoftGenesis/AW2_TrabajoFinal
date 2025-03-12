import mongoose from "mongoose";

const { Schema, models, model, ObjectId } = mongoose

const SalesSchema = new Schema({
    products: [{type: ObjectId, required: true, ref:"product"}],
    total: {type: Number, required: true},
    user: [{type: ObjectId, required: true, ref:"user"}]
    //user: {type: ObjectId, required: true, ref:"user"} Idea para hacer 
}, {timestamps: true})//timestamps nos devuelve la fecha en la que se creo y la ultima fecha de actualizacion 

const Sales = models.sales || model('sales', SalesSchema)

export default Sales