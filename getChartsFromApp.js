const parseProductData = JSON.parse(localStorage.getItem("products"));
const chartHistoryContainer = document.getElementById(
  "chart-history-container"
);

let graphLabels = [];
let graphData_votes = [];
let graphData_shown = [];

let imageListSorted = [...parseProductData];

let pastCharts = [];

if (localStorage.getItem("pastCharts")) {
  console.log("Past charts found!");
  pastCharts = JSON.parse(localStorage.getItem("pastCharts")).reverse();
}

// credit to: https://byby.dev/js-sort-by-object-property
function compareByVotes(a, b) {
  return b.times_voted - a.times_voted;
}

function sortData() {
  imageListSorted.sort(function (a, b) {
    return compareByVotes(a, b);
  });

  pastCharts.sort(function (a, b) {
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

const ctx = document.getElementById("chart");

let config = new Chart(ctx, {
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

function replaceChart(chart_id) {}

function renderChartHistory() {
  sortData();

  for (let i = 0; i < pastCharts.length; i++) {
    let div = document.createElement("div");
    div.classList.add("chart-history-cell");

    div.setAttribute("id", `pastChart-${i}`);
    chartHistoryContainer.appendChild(div);

    div_chartDescriptor = document.createElement("div");
    div_chartDescriptor.classList.add("chart-descriptor");

    div_chartDescriptor.textContent = `Chart ${i + 1}`;

    // miniCanvas = document.createElement("canvas");
    // miniCanvas.setAttribute("id", `miniCanvas-${i}`);

    div.appendChild(div_chartDescriptor);
    // div.appendChild(miniCanvas);

    // ctxMini = document.getElementById(`miniCanvas-${i}`);

    let currentChart = pastCharts[i];

    console.log("currentChart", currentChart);

    div.addEventListener("click", function () {
      replaceChart(currentChart);
    });
    // for (let x=0; x<pastCharts[i].length; x++) {

    //     // console.log(pastCharts[i][x]);

    // }

    let miniCtx_votes = [];
    let miniCtx_shown = [];

    // for (let i = 0; i < currentChart.length; i++) {
    //   if (currentChart[i].times_voted != 0) {
    //     miniCtx_votes.push(currentChart[i].times_shown);
    //     miniCtx_shown.push(currentChart[i].times_voted);
    //   }
    // }

    // config = new Chart(ctxMini, {
    //   type: "bar",
    //   data: {
    //     labels: graphLabels,
    //     datasets: [
    //       {
    //         type: "bar",
    //         label: "# of votes",
    //         data: miniCtx_votes,
    //         // borderWidth: 6,
    //         backgroundColor: ["red", "green", "skyblue", "purple", "orange"],
    //       },
    //       {
    //         type: "bar",
    //         label: "# of times shown",
    //         data: miniCtx_shown,
    //         // borderWidth: 6,
    //         backgroundColor: ["lightgrey"],
    //       },
    //     ],
    //   },
    //   options: {
    //     scales: {
    //       x: {
    //         stacked: true,
    //         display: false,
    //       },
    //       y: {
    //         display: false,
    //       },
    //     },
    //     responsive: false,

    //     bezierCurve: false, //remove curves from your plot
    //     scaleShowLabels: false, //remove labels
    //     tooltipEvents: [], //remove trigger from tooltips so they will'nt be show
    //     pointDot: false, //remove the points markers
    //     scaleShowGridLines: true, //set to false to remove the grids background

    //     plugins: {
    //       legend: {
    //         display: false,
    //       },
    //     },
    //   },
    // });

    // let ctxURI = ctxMini.toDataURL();

    // let ctxImage = new Image();
    // ctxImage.src = ctxURI;

    // ctxMini.appendChild(ctxImage);
  }
}

renderChartHistory();

function replaceChart(chart) {
  console.log(chart);

  config.destroy();

  let newDataset_shown = [];
  let newDataset_votes = [];

  for (let i = 0; i < chart.length; i++) {
    newDataset_shown.push(chart[i].times_shown);
    newDataset_votes.push(chart[i].times_voted);
  }

  config = new Chart(ctx, {
    type: "bar",
    data: {
      labels: graphLabels,
      datasets: [
        {
          type: "bar",
          label: "# of votes",
          data: newDataset_votes,
          // borderWidth: 6,
          backgroundColor: ["red", "green", "skyblue", "purple", "orange"],
        },
        {
          type: "bar",
          label: "# of times shown",
          data: newDataset_shown,
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
}

// credit to: https://stackoverflow.com/questions/28530535/is-there-any-way-to-create-mini-very-small-chart-with-chart-js
