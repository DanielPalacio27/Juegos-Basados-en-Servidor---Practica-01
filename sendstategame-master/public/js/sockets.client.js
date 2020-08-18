import { startGame, updateState } from "./game.client.js";
import { axis } from "./modules/controls.js";

var socket;

const searchParams = new URLSearchParams(window.location.search);
let username = searchParams.get("username");

console.log(username);

if (username) {
  socket = io(window.location.host + "?username=" + username);
  //Listeners
  socket.on("connect", function () {
    console.log("Conexión exitosa");
  });
  socket.on("welcomeMessage", function (data) {
    console.log("Server: " + data.message);
    console.log(data.state);
    startGame(data);

    document.addEventListener("playerMove", playerMove, false);
  });

  socket.on("updateState", function (data) {
    updateState(data.state);
  });
  socket.on("userConnection", function (resp) {
    console.log("Server: " + resp.message);
  });
  socket.on("userDisconnection", function (resp) {
    console.log("Server: " + resp.message);
  });
  socket.on("disconnect", function (resp) {
    console.log("Desconexi0on del servidor");
  });
  socket.on("error", function (reason) {
    console.log(reason);
  });

  //******************************************//
  function playerMove() {
    socket.emit("move", axis);
  }
} else {
  console.log("Ingrese username");
}
