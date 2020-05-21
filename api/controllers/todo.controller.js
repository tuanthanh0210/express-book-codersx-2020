const Todo = require("../../models/todo.model");

module.exports.index = async (req, res) => {
  let todos = await Todo.find();
  let returnTodo = todos.map(todo => {
    return {
      id: todo['_id'],
      title: todo.title,
      isComplete: todo.isComplete
    }
  })
  res.json(returnTodo);
};

module.exports.search = async (req, res) => {
  let todos = await Todo.find()
  let q = req.query.q;
  let filterTodos = todos.filter(todo =>
    todo.title.toLowerCase().indexOf(q.toLowerCase()) !== -1
  ).map(todo => {
    return {
      id: todo['_id'],
      title: todo.title,
      isComplete: todo.isComplete
    }
  });
  res.json(filterTodos)
}

module.exports.create = async (req, res) => {
  await Todo.create(req.body);
  let todos = await Todo.find()

  let returnTodo = todos.map(todo => {
    return {
      id: todo['_id'],
      title: todo.title,
      isComplete: todo.isComplete
    }
  })
  res.json(returnTodo);
};

module.exports.update = async (req, res) => {
  let id = req.params.id;
  await Todo.findByIdAndUpdate(id, {
    // title: req.body.title,
    isComplete: true
  })
  let todos = await Todo.find();
  let returnTodo = todos.map(todo => {
    return {
      id: todo['_id'],
      title: todo.title,
      isComplete: todo.isComplete
    }
  })
  res.json(returnTodo);
}

module.exports.delete = async (req, res) => {
  let id = req.params.id;

  await Todo.findByIdAndRemove(id);
  let todos = await Todo.find()

  let returnTodo = todos.map(todo => {
    return {
      id: todo['_id'],
      title: todo.title,
      isComplete: todo.isComplete
    }
  })
  res.json(returnTodo);
};
