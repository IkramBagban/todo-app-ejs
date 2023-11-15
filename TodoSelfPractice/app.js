const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

// const todosRoutes = require('./routes/todosRoutes')

// app.use('/todos',todosRoutes)

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false })); // using this to get req.body

let todos = [];

app.get("/", (req, res) => {
  // path dete time full path dene ki zarurat ni yaha pe. kyu k view folder already open set karchuke. to us folder k andar ka hi path dena hai. instead of './views/homePage.ejs' is ki jagah sirf 'homePage'
  res.render("homePage", { pageTitle: "Home Page" });
});

app.get("/todos", (req, res) => {
  // fs.readFile()
  console.log(path.join(__dirname, "database.json"));
  const dbPath = path.join(__dirname, "database.json");
  fs.readFile("database.json", (e, data) => {
    todos = JSON.parse(data);
    res.render("todos", { pageTitle: "Todos", todos: JSON.parse(data) });
  });
});

app.get("/add-todo", (req, res) => {
  res.render("addTodo");
});

app.post("/add-todo", (req, res) => {
  // res.render('addTodo')
  const todo = req.body.todo;
  fs.readFile("database.json", (e, data) => {
    todos = JSON.parse(data);
    console.log("todos", todos);
    const t = { id: Math.random().toString(), todo: todo };
    todos.push(t);
    fs.writeFile("database.json", JSON.stringify(todos), (e) => {
      if (e) console.log("got error when adding todo");
    });
  });

  res.redirect("/todos");
});

// app.post()

app.listen(4000, () => {
  console.log("app is listening on PORT 4000");
});
