class Cell {

  constructor(r, g, b) {

    if (!r && !g && !b) {
      this.red = 0;
      this.green = 0;
      this.blue = 0;
      this.active = false;
    }
    else {

      //The variation from the color inherited
      let changing = offsetForm;

      //Colors of the cell
      this.red = r;
      this.green = g;
      this.blue = b;

      //The cell is now active
      this.active = true;

      // The offset to chance the color just a little bit
      let offset = floor(random(-changing, changing));
      let index = floor(random(3));

      // Change just one of the three colors
      if (index == 0) this.red += offset;
      else if (index == 1) this.green += offset;
      else this.blue += offset;
    }

  }

}