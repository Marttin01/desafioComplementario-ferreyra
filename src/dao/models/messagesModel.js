import mongoose from "mongoose";

const messagesCollection = 'messages'

const messagesSchema = new mongoose.Schema({
    user:{
        type:String
    },
    mensaje:{
        type:String
    },
    fecha:{
        type:Object
    }
})

export const messagesModel = mongoose.model(messagesCollection, messagesSchema)