let axis = {
  horizontal: 0,
  vertical: 0,
};

let lastAxis = {
  horizontal: 0,
  vertical: 0,
};
let up = 0,
  down = 0,
  left = 0,
  right = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var playerMoveEvent = new Event("playerMove");

function keyDownHandler(e) {
  if (e.keyCode == 40) {
    down = 1;
  } else if (e.keyCode == 39) {
    right = 1;
  } else if (e.keyCode == 38) {
    up = -1;
  } else if (e.keyCode == 37) {
    left = -1;
  }
  setAxis();
}
function keyUpHandler(e) {
  if (e.keyCode == 40) {
    down = 0;
  } else if (e.keyCode == 39) {
    right = 0;
  } else if (e.keyCode == 38) {
    up = 0;
  } else if (e.keyCode == 37) {
    left = 0;
  }
  setAxis();
}

function setAxis() {
  axis.horizontal = left + right;
  axis.vertical = up + down;

  if (axisChange()) {
    Object.assign(lastAxis, axis);
    document.dispatchEvent(playerMoveEvent);
  }
}
function axisChange() {
  return (
    axis.vertical != lastAxis.vertical || axis.horizontal != lastAxis.horizontal
  );
}

export { axis };
