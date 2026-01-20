const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

let tasks = [
  {
    id: 1,
    title: "Learn Node.js",
    description: "Practice 6 to 7 a.m.",
    date: "2026-01-20",
    priority: "High"
  },
  {
    id: 2,
    title: "Build Portfolio",
    description: "Create a personal website",
    date: "2026-01-22",
    priority: "Medium"
  }
];

let nextId = 3;
app.get("/", (req, res) => {
  res.render("index", {tasks});
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add-task",(req, res)=>{
  const { title, description, date, priority } = req.body;

  tasks.push({
    id: nextId++,
    title,
    description,
    date,
    priority
  });
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  res.render("edit", { task });
});

app.post("/update/:id", (req, res) => {
  const { title, description, date, priority } = req.body;

  tasks = tasks.map(task => {
    if (task.id == req.params.id) {
      return {
        ...task,
        title,
        description,
        date,
        priority
      };
    }
    return task;
  });

  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  tasks = tasks.filter(task => task.id != req.params.id);
  res.redirect("/");
});

app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});