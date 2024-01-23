const express = require("express");
const { default: generateRandomID } = require("../utils/GenerateRandomID");

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
    try {
      todoList = todoList.filter((todo) => todo._id !== id);
      socketIO.emit("todos", todoList);
    } catch (error) {
      console.error("Error in deleteTodo:", error);
      socket.emit("error", { message: "Error deleting todo item" });
    }
  });
  // NB when using database may need to delete comments as well as todo to avoid waste storage.

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected from Socket.io");
  });

  socket.on("retrieveComments", (todoId) => {
    try {
      const todo = todoList.find((t) => t._id === todoId);
      if (todo) {
        socket.emit("displayComments", todo.comments);
      } else {
        throw new Error("Todo not found");
      }
    } catch (error) {
      console.error("Error in retrieveComments:", error);
      socket.emit("error", { message: "Error retrieving comments" });
    }
  });

  socket.on("addComment", (data) => {
    try {
      const result = todoList.find((todo) => todo._id === data.todo_id);
      if (result) {
        result.comments.unshift({
          id: generateRandomID(),
          title: data.comment,
          user: data.user,
        });
        socketIO.emit("displayComments", result.comments);
      } else {
        throw new Error("Todo for comment not found");
      }
    } catch (error) {
      console.error("Error in addComment:", error);
      socket.emit("error", { message: "Error adding comment" });
    }
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
