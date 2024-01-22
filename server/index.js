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

const todoList = [];
// following generates a base36 (0-9 and a-z) string, then snips off the '0.' at the start and makes it 8 char long (each is a 0-9 OR a-z) i.e. 8 random-char letter or number
const generateRandomID = () => Math.random().toString(36).substring(2, 10);

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("addTodo", (todo) => {    
    try {
    todoList.unshift({ _id: generateRandomID(), title: todo, comments: [] });
    socket.emit("todos", todoList);
    } catch (error) {console.error("Error in addTodo:", error);
    socket.emit("error", "Error adding todo item");
  }
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});
socket.on("error", (err) => {
  console.log("Socket Error:", err);
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
  try{
  res.json(todoList);
} catch (error) {
  res.status(500).json({ error: "Internal server error" });
}
});


// better (must) using http.listen not app.listen(), which wraps express server, since socket.io is a http server
http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
