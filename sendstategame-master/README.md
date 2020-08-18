## Practica # 1 – Modelo de estado con WebSockets

### Objetivo:

El Objetivo principal de esta práctica es evidenciar el funcionamiento del modelo de sincronización por estado (Send State Model) para posteriormente lograr observar la necesidad de implementar técnicas que mejoren la experiencia de jugador, como las técnicas de predicción de cliente.

### Método:

Para realizar esta practica creamos en clase un juego web sencillo que utiliza el modelo de sincronización por estado (Send State Model), en el cual los jugadores se conectan al servidor utilizando websockets. El juego tiene como objetivo recolectar monedas que aparecen aleatoriamente por todo el mapa, las monedas le otorgan al jugador un puntaje.

### Actividades:

#### • Descargar el código fuente.

#### • Habilitar la opción de ingresar con el nombre de usuario. (realizado en clase)

#### • Mostrar del lado del cliente la lista de jugadores conectados y sus puntajes. (realizado en clase)

#### • Realizar las validaciones que crea pertinente al momento de ingresar un jugador. Ej. Si el usuario existe en la “Base de datos”. Si el jugador ya se encuentra en línea.

#### • Almacenar del lado del servidor puntaje de cada usuario y cargarlo del lado del cliente al conectarse al juego

### Instrucciones
```
npm install

```

recuerde agregar "?username=sunombredeusuario" al final de la ruta en el navegador para poder ingresar al juego
