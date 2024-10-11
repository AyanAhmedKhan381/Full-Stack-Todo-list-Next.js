import mongoose from "mongoose"

export const ConnectDB = async()=> {
    await mongoose.connect('mongodb+srv://AyanStack:ayanpubgstar381@cluster0.h93ya.mongodb.net/todo-app')
    console.log("DB Connected")
}