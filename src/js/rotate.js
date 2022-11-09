const container = document.getElementById("container");

let rotation = 0;
let isDragging = false;

container.onmousedown((e) => {
  isDragging = true;
  let lastX = e.clientX;
  let lastY = e.clientY;
});
