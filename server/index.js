const express = require("express");
const app = express();
const PORT = 4000;
const http = require("http").createServer(app);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
    //= io.connect("http://192.168.0.20:4000")
  },
});

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
