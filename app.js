// const fs = require("fs");

let minRoundsLeft = 25;

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.times_shown = 0;
  this.times_voted = 0;
  // this.selectImage = function() {
  //   this.times_voted++;
  //   console.log(`Voted image: ${this.name}. You voted for this ${this.times_voted}`);
  //   renderVoteImages();
  // }
}

Product.prototype.selectImage = function() {
  this.times_voted++;
  console.log(`Voted image: ${this.name}. You voted for this ${this.times_voted}`);
  
  renderVoteImages();
}

let imageList = [
  new Product('Bag', './assets/bag.jpg'),
  new Product('Banana', './assets/banana.jpg'),
  new Product('Bathroom', './assets/bathroom.jpg'),
  new Product('Boots', './assets/boots.jpg'),
  new Product('Breakfast', './assets/breakfast.jpg'),
  new Product('Bubblegum', './assets/bubblegum.jpg'),
  new Product('Chair', './assets/chair.jpg'),
  new Product('Cthulhu', './assets/cthulhu.jpg'),
  new Product('Dog Duck', './assets/dog-duck.jpg'),
  new Product('Dragon', './assets/dragon.jpg'),
  new Product('Pen', './assets/pen.jpg'),
  new Product('Pet Sweep', './assets/pet-sweep.jpg'),
  new Product('Scissors', './assets/scissors.jpg'),
  new Product('Shark', './assets/shark.jpg'),
  new Product('Sweep', './assets/sweep.png'),
  new Product('Tauntaun', './assets/tauntaun.jpg'),
  new Product('Unicorn', './assets/unicorn.jpg'),
  new Product('Water Can', './assets/water-can.jpg'),
  new Product('Wine Glass', './assets/wine-glass.jpg'),

];

function returnRandomImageID() {
  return Math.floor(Math.random() * imageList.length);
}


function renderVoteImages() {

  let img_1 = document.getElementById('img1');
  let img_2 = document.getElementById('img2');
  let img_3 = document.getElementById('img3');

  let img_1_randInd = returnRandomImageID();
  let img_2_randInd = returnRandomImageID();
  let img_3_randInd = returnRandomImageID();

  while(img_1_randInd === img_2_randInd || img_1_randInd == img_3_randInd || img_2_randInd === img_1_randInd || img_2_randInd === img_3_randInd) {
     console.log('loop cuz same image')
     img_1_randInd = returnRandomImageID();
     img_2_randInd = returnRandomImageID();
     img_3_randInd = returnRandomImageID();
  }
  
  img_1.setAttribute('src', imageList[img_1_randInd].src);
  img_2.setAttribute('src', imageList[img_2_randInd].src);
  img_3.setAttribute('src', imageList[img_3_randInd].src);
  
  // img_1.removeEventListener("click", function() { imageList[img_1_randInd].selectImage() });
  // img_2.removeEventListener("click", function() {imageList[img_2_randInd].selectImage() });
  // img_3.removeEventListener("click", function() {
    
  //   imageList[img_3_randInd].selectImage() }
    
  // );
  
  img_1.addEventListener("click", function() { imageList[img_1_randInd].selectImage() }, {once: true});
  img_2.addEventListener("click", function() { imageList[img_2_randInd].selectImage() }, {once: true});
  img_3.addEventListener("click", function() {
    
    imageList[img_3_randInd].selectImage() } , {once: true}
    
  );

  imageList[img_1_randInd].times_shown++;
  imageList[img_2_randInd].times_shown++;
  imageList[img_3_randInd].times_shown++;



}


renderVoteImages();