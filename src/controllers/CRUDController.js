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
  