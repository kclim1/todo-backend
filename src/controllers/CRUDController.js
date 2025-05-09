const User = require('../schema/User')
const Todo = require('../schema/Todo')

exports.createTodo = async (req, res) => {
    const { title, description } = req.body; 
  
    try {
      const ownerId = req.user.googleId; 
      // Create the new to-do
      const newTodo = await Todo.create({
        ownerId: ownerId, 
        title: title,
        description: description,
        completed: false 
      });
  
      console.log(' To-Do has been created:', newTodo);
  
      res.status(201).json({
        message: "New To-Do Created",
        todo: newTodo
      });
    } catch (error) {
      console.error("Error creating to-do:", error);
      res.status(500).json({ message: "Error creating to-do." });
    }
  };

exports.viewAllTodos = async (req, res) => {
  const googleId = req.user.googleId; 
  
  try {
    const allTodos = await Todo.find({ ownerId: googleId });
  
    if (!allTodos || allTodos.length === 0) {
      return res.status(404).json({ message: "You have no todos yet." });
    }
  
    console.log(' All todos fetched for user:', allTodos);
    res.status(200).json({ todos: allTodos });
  
  } catch (error) {
    console.error(" Error fetching all todos:", error);
    res.status(500).json({ message: "Error fetching all todos." });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params; 
    console.log(' This is the to-do selected for deletion:', id);

    const todoToDelete = await Todo.findOneAndDelete({ _id: id });

    if (!todoToDelete) {
      return res.status(404).json({ message: "To-Do not found." });
    }

    console.log(' To-Do has been successfully deleted:', todoToDelete);
    res.status(200).json({ message: "To-Do successfully deleted." });

  } catch (error) {
    console.error(" Error deleting to-do:", error);
    res.status(500).json({ message: "Error deleting to-do." });
  }
};

exports.updateTodoStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; //can be either true or false 

  try {
    console.log('This is the to-do selected for status update:', id);

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id },               
      { completed: status },  
      { new: true }             
    );

    if (!updatedTodo) {
      console.log('todo not found')
      return res.status(404).json({ message: "To-Do not found." });
    }

    console.log('To-Do status updated:', updatedTodo);
    res.status(200).json({
      message: "To-Do status updated successfully.",
      todo: updatedTodo
    });

  } catch (error) {
    console.error("Error updating to-do status:", error);
    res.status(500).json({ message: "Error updating to-do status." });
  }
};