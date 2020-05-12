const Todo = require("../../models/todo.model");

module.exports.index = async (req, res) => {
  let todos = await Todo.find();
  let returnTodo = todos.map(todo => {
    return {
      id: todo.id,
      title: todo.title,
      isComplete: todo.isComplete
    }
  })
  res.json(returnTodo);
};

module.exports.search = async (req,res) => {
  let todos = await Todo.find()
  let q = req.query.q;
  let filterTodos = todos.filter( todo => 
      todo.title.toLowerCase().indexOf(q.toLowerCase()) !== -1 
  );
  res.json(filterTodos)
}

module.exports.create = async (req, res) => {
  let newTodo = await Todo.create(req.body);

  res.json(newTodo);
};

module.exports.update = async (req,res) => {
    let id = req.params.id;
    let todo = await Todo.findByIdAndUpdate(id, {
        title: req.body.title,
    })
    todo.title = req.body.title;
    res.json(todo)
}

module.exports.delete = async (req, res) => {
  let id = req.params.id;

  let todo = await Todo.findByIdAndRemove(id);

  res.json(todo);
};
