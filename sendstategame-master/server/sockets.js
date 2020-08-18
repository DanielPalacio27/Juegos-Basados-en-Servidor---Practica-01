const { io } = require("./server");
const game = require("./game-logic/game.server");
const fs = require("fs");

const TIME_STEP = 50;

var currentUser = {};

const usersFile = fs.readFileSync('users.json');
let usersJSON = JSON.parse(usersFile);

//Crea un nuevo usuario y lo guarda en la base de datos (users.JSON)
function createNewUser(username, id)
{
  currentUser = {
    "id" : id,
    "username" : username,
    "coins" : 200,
    "isOnline" : true
  };

  usersJSON.push(currentUser);

  fs.writeFileSync('users.json', JSON.stringify(usersJSON));
  console.log("Creando un nuevo usuario ", username);
}

//Actualiza la base de datos dada una key y un value
function updateUserValue(key, val)
{
  currentUser[key] = val;
  let id = currentUser["id"];
  usersJSON[id] = currentUser;
  fs.writeFileSync('users.json', JSON.stringify(usersJSON));
}


function validation(username) {

  let length = usersJSON.length;
  for(i = 0; i < length; i++)
  {
    //Si el usuario ya existe y no esta conectado, permite el loggeo
    if(usersJSON[i].username === username)
    {
      console.log("El nombre de usuario ya existe");

      if(usersJSON[i].isOnline === true)
      {
        console.log("El usuario ya esta conectado");
        return false;  
      }

      currentUser = usersJSON[i];
      updateUserValue("isOnline", true);
      return true;
    }
  }

  createNewUser(username, length);
  return true;
}

//Middleware para autenticacion
io.use((client, next) => {
  let username = client.handshake.query.username;
  console.log("Middleware: validando conexion ", username);
  if (validation(username)) {
    return next();
  }
  //client.disconnect();
  return next(new Error("authentication error"));
});

io.on("connection", (client) => {
  let username = client.handshake.query.username;
  console.log("Usuario Conectado", username);
  game.spawnPlayer(client.id, username, currentUser["coins"], currentUser);
  client.emit("welcomeMessage", {
    message: "Bienvenido al juego",
    id: client.id,
    state: game.STATE,
  });

  client.on("move", (axis) => {
    game.setAxis(client.id, axis);
  });
  client.broadcast.emit("userConnection", {
    message: "Se ha conectado un nuevo usuario",
  });

  //Listeners
  client.on("broadcastEmit", (data, callback) => {
    console.log("Cliente:", data);
    client.broadcast.emit("broadcastEmit", data);
    callback({ message: "El mensaje fue recibido correctamente" });
  });
  client.on("disconnect", () => {
    console.log("Usuario desconectado");

    updateUserValue("isOnline", false); //Actualiza el estado de conexion del usuario

    game.removePlayer(client.id);
    client.broadcast.emit("userDisconnection", {
      message: "Se ha desconectado un usuario",
    });
  });
});

setInterval(() => {
  io.emit("updateState", { state: game.STATE });
}, TIME_STEP);

exports.currentUser = currentUser;