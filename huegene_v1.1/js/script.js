let widthForm = 600,
  heightForm = 600,
  resForm = 5,
  randomnessForm = 0.1,
  offsetForm = 10,
  starting = 1,
  center;

function getElements() {
  widthForm = document.getElementById('canva-width').value;
  heightForm = document.getElementById('canva-height').value;
  resForm = document.getElementById('canva-res').value;
  randomnessForm = document.getElementById('randomness').value;
  offsetForm = document.getElementById('offset').value;
  starting = document.getElementById('starting').value;
  center = document.getElementById('center').checked;

  console.log(center)

  start();
}