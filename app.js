let img, sorted;
let neighbors_arr = [];

function preload() {
  img = loadImage("./photo.jpg");
}

function setup() {
  createCanvas(img.width / 2, img.height / 2);
  img.resize(width, 0);
  sorted = img.get();
}

function draw() {
  swapRGBA(img, 4);
}

function findDarkPixel(img, start, threshold) {
  let lowest_brightness = threshold;
  let index_of_lowest_brightness = null;
  for (let i = start; i < img.pixels.length - start; i += 4) {
    const r = img.pixels[i];
    const g = img.pixels[i + 1];
    const b = img.pixels[i + 2];
    const a = img.pixels[i + 3];
    const current_color = color(r, g, b, a);
    const current_brightness = brightness(current_color);

    if (current_brightness < lowest_brightness) {
      lowest_brightness = current_brightness;
      index_of_lowest_brightness = floor(i / 4);
    }
  }

  if (index_of_lowest_brightness === null) {
    index_of_lowest_brightness = floor(random(img.pixels.length));
  }

  return index_of_lowest_brightness;
}

function getNeighborPixels(img, index, range) {
  const neighbors = [];

  for (let i = index; i < index + range; i++) {
    neighbors.push({
      index: i,
      value: img.pixels[index + i],
    });
  }

  return neighbors;
}

function randomlyColorPixel(img, sorting_range, step) {
  const start_index = sorting_range[0].index;
  const end_index = start_index + sorting_range.length - 1;

  for (let i = 0; i < sorting_range.length; i += step) {
    const random_pixel_index = floor(random(start_index, end_index));
    img.pixels[sorting_range[i].index] = img.pixels[random_pixel_index];
  }
}

function swapRGBA(img, step) {
  img.loadPixels();

  const random_threshold = floor(random(255));
  const random_start = floor(random(img.pixels.length));
  const random_range = floor(random(5000, 100000));
  const dark_index = findDarkPixel(img, random_start, random_threshold);
  const neighbors = getNeighborPixels(img, dark_index, random_range);
  neighbors_arr.push(neighbors);

  for (let i = 0; i < neighbors_arr.length; i++) {
    randomlyColorPixel(img, neighbors_arr[i], step);
  }

  img.updatePixels();

  image(img, 0, 0, width, height);
}
