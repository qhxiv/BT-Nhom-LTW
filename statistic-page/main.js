const fromDate = document.querySelector("input#from");
const toDate = document.querySelector("input#to");

const dataCase = [
  {
    yValues: [295, 260, 453, 477, 385],
    total: 1870,
    rate: "80%",
    avg: 7,
  },
  {
    yValues: [30, 70, 200, 120, 40],
    total: 460,
    rate: "70%",
    avg: 6.1,
    date: "2023-04-01",
  },
  {
    yValues: [125, 25, 100, 200, 50],
    total: 500,
    rate: "72%",
    avg: 6.8,
    date: "2023-08-01",
  },
  {
    yValues: [20, 30, 40, 10, 200],
    total: 300,
    rate: "90%",
    avg: 8.8,
    date: "2023-12-01",
  },
  {
    yValues: [120, 135, 113, 147, 95],
    total: 610,
    rate: "60%",
    avg: 6,
    date: "2024-03-01",
  },
];

const mainColor = "#ad171c";
let xValues = ["0 - 1.9", "2 - 3.9", "4 - 5.9", "6 - 7.9", "8 - 10"];
let yValues = [120, 400, 300, 900, 150];

let chart = new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: mainColor,
        data: yValues,
      },
    ],
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "Phân bố điểm",
      font: {
        weight: "bold",
        family: "Roboto",
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

function updateData() {
  const val = Number(document.querySelector("select#exam").value);
  const data = dataCase[val];

  document.querySelector(".stat__total span").innerHTML = data.total;
  document.querySelector(".stat__avg span").innerHTML = data.avg;
  document.querySelector(".stat__rate span").innerHTML = data.rate;
  chart.data.datasets[0].data = data.yValues;
  chart.update();
}

function resetChart() {
  const data = dataCase[0];

  document.querySelector(".stat__total span").innerHTML = data.total;
  document.querySelector(".stat__avg span").innerHTML = data.avg;
  document.querySelector(".stat__rate span").innerHTML = data.rate;
  chart.data.datasets[0].data = data.yValues;
  chart.update();
}

function changeFilter() {
  resetChart();

  const examFilter = document.querySelector(".filter__exam");
  const datefilter = document.querySelector(".filter__date");
  const type = document.querySelector("select#type").value;

  if (type === "date") {
    fromDate.max = new Date().toISOString().split("T")[0];
    toDate.max = new Date().toISOString().split("T")[0];
    examFilter.style.display = "none";
    datefilter.style.display = "block";
    document.querySelector("select#exam").value = 0;
  } else {
    examFilter.style.display = "block";
    datefilter.style.display = "none";

    fromDate.value = "";
    toDate.value = "";
  }
}

function handleDateSelect() {
  if (toDate.value.length !== 0 && fromDate.value.length === 0) {
    fromDate.max = toDate.value;
  } else if (toDate.value.length === 0 && fromDate.value.length !== 0) {
    toDate.min = fromDate.value;
  } else {
    const from = new Date(fromDate.value).getTime();
    const to = new Date(toDate.value).getTime();

    const data = {
      yValues: [0, 0, 0, 0, 0],
      total: 0,
      rate: 0,
      avg: 0,
    };

    let cnt = 0;

    for (let i = 1; i < dataCase.length; ++i) {
      let tmp = new Date(dataCase[i].date).getTime();
      if (tmp >= from && tmp <= to) {
        ++cnt;
        for (let j = 0; j < 5; ++j) {
          data.yValues[j] += dataCase[i].yValues[j];
        }
        data.total += dataCase[i].total;
        data.avg += dataCase[i].avg;

        let rate = dataCase[i].rate;
        data.rate += Number(rate.substring(0, rate.length - 1));
      }
    }

    data.avg /= cnt;
    data.rate = data.rate / cnt + "%";

    document.querySelector(".stat__total span").innerHTML = data.total;
    document.querySelector(".stat__avg span").innerHTML = data.avg;
    document.querySelector(".stat__rate span").innerHTML = data.rate;
    chart.data.datasets[0].data = data.yValues;
    chart.update();
  }
}

const pdfBtn = $("header button")[0];

function getPDF() {
  pdfBtn.innerHTML = "Vui lòng chờ";

  var HTML_Width = $(".container").width();
  var HTML_Height = $(".container").height();
  var top_left_margin = 15;
  var PDF_Width = HTML_Width + top_left_margin * 2;
  var PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
  var canvas_image_width = HTML_Width;
  var canvas_image_height = HTML_Height;

  var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

  html2canvas($(".container")[0], { allowTaint: true }).then(function (canvas) {
    canvas.getContext("2d");

    pdfBtn.innerHTML = "Đã tải xuống";
    setTimeout(() => {
      pdfBtn.innerHTML = "Tải xuống dưới dạng PDF";
    }, 2000);

    var imgData = canvas.toDataURL("image/jpeg", 1.0);
    var pdf = new jsPDF("p", "pt", [PDF_Width, PDF_Height]);
    pdf.addImage(
      imgData,
      "JPG",
      top_left_margin,
      top_left_margin,
      canvas_image_width,
      canvas_image_height
    );

    for (var i = 1; i <= totalPDFPages; i++) {
      pdf.addPage(PDF_Width, PDF_Height);
      pdf.addImage(
        imgData,
        "JPG",
        top_left_margin,
        -(PDF_Height * i) + top_left_margin * 4,
        canvas_image_width,
        canvas_image_height
      );
    }

    pdf.save("Thống kê.pdf");
  });
}

updateData();
