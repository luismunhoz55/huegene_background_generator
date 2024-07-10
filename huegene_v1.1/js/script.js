let widthForm = 600,
  heightForm = 600,
  resForm = 5,
  randomnessForm = 0.2,
  offsetForm = 10,
  starting = 1,
  center,
  startingColorForm,
  randomColorForm = true;

function getElements() {
  widthForm = document.getElementById("canva-width").value;
  heightForm = document.getElementById("canva-height").value;
  resForm = document.getElementById("canva-res").value;
  randomnessForm = document.getElementById("randomness").value;
  offsetForm = document.getElementById("offset").value;
  starting = document.getElementById("starting").value;
  center = document.getElementById("center").checked;
  startingColorForm = hexToRGB(
    document.getElementById("startingColorForm").value
  );
  randomColorForm = document.getElementById("randomColor").checked;

  start();
}

function hexToRGB(hex) {
  hex = hex.replace(/^#/, "");

  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return { r: r, g: g, b: b };
}
