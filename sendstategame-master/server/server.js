let express = require("express");
let app = express();
let server = require("http").createServer(app);
let io = require("socket.io")(server);

const path = require("path");

const publicPath = path.resolve(__dirname, "../public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get("/users", (req, res) => {
  res.send(listaClientes);
});
module.exports.io = io;
let { listaClientes } = require("./sockets");

server.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto ${port}`);
});
