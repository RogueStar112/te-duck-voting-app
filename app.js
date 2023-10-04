// const fs = require("fs");

let roundsLeft = 25;

let noOfImagesInGame = 3;

let imageElementIds = [];

let previousImagesArray = [];

// added +1 because img starts at 1.

function renderImagePlaceholders() {
  for (let i = 1; i < noOfImagesInGame + 1; i++) {
    let imageObj = {
      containerSelector: `img${i}-container`,
      imgSelector: `img${i}`,
      textSelector: `img${i}_text`,
    };

    imageElementIds.push(imageObj);
  }

  let imagesContainer = document.getElementById("images-container");

  for (i = 0; i < noOfImagesInGame; i++) {
    let newImageContainer = document.createElement("div");
    newImageContainer.setAttribute("id", imageElementIds[i].containerSelector);

    let newImage = document.createElement("img");
    newImage.setAttribute("id", imageElementIds[i].imgSelector);

    let newImageText = document.createElement("section");
    newImageText.setAttribute("id", imageElementIds[i].textSelector);

    newImageContainer.appendChild(newImage);
    newImageContainer.appendChild(newImageText);

    imagesContainer.appendChild(newImageContainer);
  }
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
    renderVoteImages(previousImagesArray);
    renderRoundsLeft();
  } else {
    //   showResultsButton();
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

function renderVoteImages(prevArray = []) {
  if (roundsLeft === 0) {
    alert("Voting is over. You may now see the results.");
    showResultsButton();
  } else {
    let imageNumberArray = [];
    previousImagesArray = [];

    /* Okay, what in the holy name is this while loop doing you may ask...
    It prevents duplicates from appearing on the array. */

    while (imageNumberArray.length < noOfImagesInGame) {
      let randomID = returnRandomImageID();

      if (
        imageNumberArray.indexOf(randomID) !== -1 ||
        prevArray.indexOf(randomID) !== -1
      ) {
        imageNumberArray.splice(imageNumberArray.indexOf(randomID), 1);
      } else {
        imageNumberArray.push(randomID);
      }
    }

    /* Prevents previous images from being shown consistently each round. */
    for (let i = 0; i < imageNumberArray.length; i++) {
      previousImagesArray.push(imageNumberArray[i]);
    }

    // console.log("PREV IMAGES ARRAY", previousImagesArray);

    for (i = 0; i < imageNumberArray.length; i++) {
      let imgSelected = document.getElementById(imageElementIds[i].imgSelector);
      let textSelected = document.getElementById(
        imageElementIds[i].textSelector
      );

      let productSelected = imageList[imageNumberArray[i]];

      productSelected.times_shown++;

      imgSelected.setAttribute("src", imageList[imageNumberArray[i]].src);

      textSelected.textContent = imageList[imageNumberArray[i]].name;

      imgSelected.addEventListener("click", function () {
        productSelected.selectImage();
      });
    }
  }
  // }
}

function renderRoundsLeft() {
  let rounds = document.getElementById("rounds-left");
  rounds.textContent = roundsLeft;
}

function renderVotes() {
  let votes = document.getElementById("votes");

  // RENDERS LIST ON LEFT
  let ol = document.createElement("ol");

  for (let i = 0; i < imageList.length; i++) {
    let li = document.createElement("li");
    li.textContent = `#${i + 1}: ${imageList[i].name}: ${
      imageList[i].times_voted
    } votes`;
    ol.appendChild(li);
  }

  votes.appendChild(ol);

  let graphContainer = document.getElementById("graph");

  const ctx = document.getElementById("graph-container");
  // ctx.canvas.parentNode.style.height = "128px";
  // ctx.canvas.parentNode.style.width = "128px";

  let graphLabels = [];
  let graphData_votes = [];
  let graphData_shown = [];

  for (i = 0; i < imageList.length; i++) {
    if (imageList[i].times_shown != 0) {
      graphLabels.push(imageList[i].name);
      graphData_votes.push(imageList[i].times_voted);
      graphData_shown.push(imageList[i].times_shown);
    }
  }

  const config = new Chart(ctx, {
    type: "bar",
    data: {
      labels: graphLabels,
      datasets: [
        {
          type: "bar",
          label: "# of votes",
          data: graphData_votes,
          // borderWidth: 6,
          backgroundColor: ["red", "green", "skyblue", "purple", "orange"],
        },
        {
          type: "bar",
          label: "# of times shown",
          data: graphData_shown,
          // borderWidth: 6,
          backgroundColor: ["red", "green", "skyblue", "purple", "orange"],
        },
      ],
    },
  });
}

let showResultsBtn = document.getElementById("show-results");

function showResultsButton() {
  showResultsBtn.setAttribute("class", "");
}

showResultsBtn.addEventListener("click", renderVotes, { once: true });

// At the start of the program, call these.
renderImagePlaceholders();
renderVoteImages();
renderRoundsLeft();

/* 
function resetVoteListeners();
credit to: https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element


*/
