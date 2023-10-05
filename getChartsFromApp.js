const parseProductData = JSON.parse(localStorage.getItem("products"));

let graphLabels = [];
let graphData_votes = [];
let graphData_shown = [];


let imageListSorted = [...parseProductData];

// credit to: https://byby.dev/js-sort-by-object-property
function compareByVotes(a, b) {
  return b.times_voted - a.times_voted;
}

function sortData() {
  imageListSorted.sort(function (a, b) {
    return compareByVotes(a, b);
  });
}

sortData();

for (i = 0; i < imageListSorted.length; i++) {
  if (imageListSorted[i].times_shown != 0) {
    graphLabels.push(imageListSorted[i].name);
    graphData_votes.push(imageListSorted[i].times_voted);
    graphData_shown.push(imageListSorted[i].times_shown);
  }
}

const ctx = document.getElementById('chart');




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
        backgroundColor: ["lightgrey"],
      },
    ],
  },
  options: {
    scales: {
      x: {
        stacked: true,
      },
    },
  },
});