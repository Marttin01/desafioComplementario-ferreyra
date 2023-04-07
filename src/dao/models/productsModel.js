import mongoose, { mongo } from "mongoose";

const productsCollection = "products"

const productsSchema = new mongoose.Schema({
    title:String,
    description:String,
    quantity:Number,
    price:Number
})

export const productsModel = mongoose.model(productsCollection,productsSchema)