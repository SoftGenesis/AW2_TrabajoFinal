import mongoose from 'mongoose'

const { Schema, models, model, ObjectId } = mongoose

const ProductSchema = new Schema({ 
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    precio_compra: {type: Number, required: true},
    precio_venta: {type: Number, default: 0},
    stock: {type: Number, default: 0},
    categoria: {type: ObjectId, required: true, ref: "category"},
    imagen: [{type: String}]
})

const Product = models.product || model('product', ProductSchema);

export default Product