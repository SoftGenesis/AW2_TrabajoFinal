import { connectToDatabase } from "../connection.js";
import Category from "../schemas/category.schema.js"

export const createCat = async ({name}) => {
    try{
        await connectToDatabase();
        const res = await Category.create({name})
        return JSON.parse(JSON.stringify(res));
    }catch(e){
        console.log(e);
    }
};

export const findAll = async() =>{
    try{
        await connectToDatabase()
        const res = await Category.find()
        return JSON.parse(JSON.stringify(res));
    }catch(e){
        console.log(e);
    }
}

export const findByName = async(name) =>{
    try{
        await connectToDatabase()
        const res = await Category.find().find({name: name})
        return JSON.parse(JSON.stringify(res));
    }catch(e){
        console.log(e);
    }
}