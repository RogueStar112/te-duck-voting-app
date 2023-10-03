// const fs = require("fs");

let roundsLeft = 25;

let noOfImagesInGame = 3;

let imageElementIds = [];

// added +1 because img starts at 1.
for (let i = 1; i < noOfImagesInGame + 1; i++) {
  let imageObj = {
    imgSelector: `img${i}`,
    textSelector: `img${i}_text`,
  };

  imageElementIds.push(imageObj);
}

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.times_shown = 0;
  this.times_voted = 0;
}

Product.prototype.selectImage = function () {
  if (roundsLeft > 0) {
    this.times_voted++;
    roundsLeft--;
    // console.log(
    //   `Voted image: ${this.name}. You voted for this ${this.times_voted}`
    // );

    resetVoteListeners();
    renderVoteImages();
    renderRoundsLeft();
  } else {
    renderVotes();
  }
};

let imageList = [
  new Product("Bag", "./assets/bag.jpg"),
  new Product("Banana", "./assets/banana.jpg"),
  new Product("Bathroom", "./assets/bathroom.jpg"),
  new Product("Boots", "./assets/boots.jpg"),
  new Product("Breakfast", "./assets/breakfast.jpg"),
  new Product("Bubblegum", "./assets/bubblegum.jpg"),
  new Product("Chair", "./assets/chair.jpg"),
  new Product("Cthulhu", "./assets/cthulhu.jpg"),
  new Product("Dog Duck", "./assets/dog-duck.jpg"),
  new Product("Dragon", "./assets/dragon.jpg"),
  new Product("Pen", "./assets/pen.jpg"),
  new Product("Pet Sweep", "./assets/pet-sweep.jpg"),
  new Product("Scissors", "./assets/scissors.jpg"),
  new Product("Shark", "./assets/shark.jpg"),
  new Product("Sweep", "./assets/sweep.png"),
  new Product("Tauntaun", "./assets/tauntaun.jpg"),
  new Product("Unicorn", "./assets/unicorn.jpg"),
  new Product("Water Can", "./assets/water-can.jpg"),
  new Product("Wine Glass", "./assets/wine-glass.jpg"),
];

function returnRandomImageID() {
  return Math.floor(Math.random() * imageList.length);
}

function resetVoteListeners() {
  // credit to: https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
  /* Why is this needed?

    Adding event listeners to individual images creates a lot of gunk, so this clears any excess.

  */
  for (let i = 0; i < imageElementIds.length; i++) {
    let imgSelected = document.getElementById(imageElementIds[i].imgSelector);

    let cloneOfImgSelected = imgSelected.cloneNode(true);

    imgSelected.parentNode.replaceChild(cloneOfImgSelected, imgSelected);
  }
}

function renderVoteImages() {
  let imageNumberArray = [];

  /* Okay, what in the holy name is this while loop doing you may ask...
  It randomly selects numbers based on the array */

  while (imageNumberArray.length < noOfImagesInGame) {
    let randomID = returnRandomImageID();

    if (imageNumberArray.indexOf(randomID) !== -1) {
      imageNumberArray.splice(
        imageNumberArray.indexOf(randomID),
        1,
        returnRandomImageID()
      );
    } else {
      imageNumberArray.push(randomID);
    }
  }

  for (i = 0; i < imageNumberArray.length; i++) {
    let imgSelected = document.getElementById(imageElementIds[i].imgSelector);
    let textSelected = document.getElementById(imageElementIds[i].textSelector);

    let productSelected = imageList[imageNumberArray[i]];

    productSelected.times_shown++;

    imgSelected.setAttribute("src", imageList[imageNumberArray[i]].src);

    textSelected.textContent = imageList[imageNumberArray[i]].name;

    imgSelected.addEventListener("click", function () {
      productSelected.selectImage();
    });
  }
  // }
}

function renderRoundsLeft() {
  let rounds = document.getElementById("rounds-left");
  rounds.textContent = roundsLeft;
}

function renderVotes() {
  let votes = document.getElementById("votes");

  let ol = document.createElement("ol");

  for (let i = 0; i < imageList.length; i++) {
    let li = document.createElement("li");
    li.textContent = `#${i + 1}: ${imageList[i].name}: ${
      imageList[i].times_voted
    } votes`;
    ol.appendChild(li);
  }

  votes.appendChild(ol);
}

renderVoteImages();
renderRoundsLeft();

/* 
function resetVoteListeners();
credit to: https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element


*/
