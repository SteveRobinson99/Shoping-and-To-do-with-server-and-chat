const express = require("express");
const app = express();
const PORT = 4000;
const http = require("http").createServer(app);

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
    //= io.connect("http://192.168.0.20:4000")
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let todoList = [];
// following generates a base36 (0-9 and a-z) string, then snips off the '0.' at the start and makes it 8 char long (each is a 0-9 OR a-z) i.e. 8 random-char letter or number
const generateRandomID = () => Math.random().toString(36).substring(2, 10);

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected to Socket.io!`);

  socket.on("addTodo", (todo) => {
    try {
      todoList.unshift({ _id: generateRandomID(), title: todo, comments: [] });
      socketIO.emit("todos", todoList);
    } catch (error) {
      console.error("Error in addTodo:", error);
      socket.emit("error", "Error adding todo item");
    }
  });

  socket.on("deleteTodo", (id) => {
    todoList = todoList.filter((todo) => todo._id !== id);
    socketIO.emit("todos", todoList);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected from Socket.io");
  });

  socket.on("retrieveComments", (todoId) => {
    const todo = todoList.find((t) => t._id === todoId);
    if (todo) {
      socket.emit("displayComments", todo.comments);
    }
  });

  socket.on("addComment", (data) => {
    let result = todoList.filter((todo) => todo._id === data.todo_id);
    result[0].comments.unshift({
      id: generateRandomID(),
      title: data.comment,
      user: data.user,
    });
    socketIO.emit("displayComments", result[0].comments);
  });
});

app.get("/api", (req, res) => {
  try {
    res.json({
      message: "Hello world",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/todos", (req, res) => {
  try {
    res.json(todoList);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// better (must) using http.listen not app.listen(), which wraps express server, since socket.io is a http server
http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
