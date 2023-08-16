let cnv
let grid;
let cols, rows;
let res;
let randomness;
let nextGrid;
let paused;

function download() {
  saveCanvas(cnv, 'background', 'png');
}

function pause() {
  paused = !paused;
}

function start() {
  setup();
  draw();
}

function setup() {
  cnv = createCanvas(widthForm, heightForm);
  cnv.parent('canva');

  paused = false;

  res = resForm;
  randomness = randomnessForm;

  // Size of the grid
  cols = floor(width / res);
  rows = floor(height / res);

  grid = make2DArray(cols, rows);
  nextGrid = make2DArray(cols, rows);

  //Populating the grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell();
      nextGrid[i][j] = new Cell();
    }
  }

  if (center) {

    let a = cols / 2;
    let b = rows / 2;

    // Creating a cell in the center with color, to start the algorithm
    grid[a][b] = new Cell(randomColor(), randomColor(), randomColor());

  }
  else {

    for (let i = 0; i < starting; i++) {

      let a = floor(random(cols));
      let b = floor(random(rows));

      // Creating a random cell with color, to start the algorithm
      grid[a][b] = new Cell(randomColor(), randomColor(), randomColor());

    }
  }

}

function draw() {
  loop();
  background(0);

  // Draw Grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      let cell = grid[i][j];

      // Painting the grid
      let r = cell.red;
      let g = cell.green;
      let b = cell.blue;

      fill(r, g, b);

      noStroke();
      rect(i * res, j * res, res, res);
    }
  }

  //If it's finished, save the picture and stop the loop
  if (check()) {
    noLoop();
  }

  if (!paused) {

    // Creating the next grid
    let next = nextGrid;

    // Iterating for all the cells
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {

        // If the cell is already active, leave it as it is
        if (grid[i][j].active) {
          next[i][j] = grid[i][j];
        }
        else {

          // Check neighbors for all cells, including those at the edges
          let neighborFound = false;

          let xStart, xFinish, yStart, yFinish;
          if (i == 0) {
            xStart = 0;
            xFinish = 2;
          }
          else if (i == cols - 1) {
            xStart = -1;
            xFinish = 1;
          }
          else {
            xStart = -1;
            xFinish = 2;
          }
          if (j == 0) {
            yStart = 0;
            yFinish = 2;
          }
          else if (j == cols - 1) {
            yStart = -1;
            yFinish = 1;
          }
          else {
            yStart = -1;
            yFinish = 2;
          }


          for (let x = xStart; x < xFinish; x++) {
            for (let y = yStart; y < yFinish; y++) {
              // Use modulo operator to handle cells at the edges
              let checkX = (i + x + cols) % cols;
              let checkY = (j + y + rows) % rows;

              if (grid[checkX][checkY].active && grid[checkX][checkY] !== grid[i][j]) {
                let index = random(1);
                if (index < randomness) {
                  next[i][j] = new Cell(grid[checkX][checkY].red, grid[checkX][checkY].green, grid[checkX][checkY].blue);
                  neighborFound = true;
                  break;
                }
              }
            }
            if (neighborFound) {
              break;
            }
          }
          // If no active neighbor was found, the Cell remains unchanged
          if (!neighborFound) {
            next[i][j] = grid[i][j];
          }

        }

      }
    }

    // The grid becomes the new grid
    grid = next;

  }
}

// Checks if the entire grid is a colorful Cell
function check() {

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      let test = grid[i][j].active;
      if (!test) {
        return false;
      }

    }
  }

  return true;
}

function randomColor() {
  return floor(random(255));
}

function make2DArray(cols, rows) {
  let array = new Array(cols)

  for (let i = 0; i < array.length; i++) {
    array[i] = new Array(rows);
  }

  return array;
}