import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Corrected 'require' to 'required'
    },
    description: {
        type: String,
        required: true, // Corrected 'require' to 'required'
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});


const TodoModel = mongoose.models.todo || mongoose.model('todo', Schema);

export default TodoModel;
