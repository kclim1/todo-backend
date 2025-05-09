
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String,
      required: true,
      index: true 
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "" 
    },
    completed: {
      type: Boolean,
      default: false 
    }
    // Can include priority, dueDate in the future. i chose to exclude them at this time 
  },
  {
    timestamps: true 
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
