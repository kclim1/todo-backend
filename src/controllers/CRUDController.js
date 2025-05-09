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

  