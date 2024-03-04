function generateRandomAnswers() {
  let res = [];
  for (let i = 0; i < 40; ++i) {
    res.push(Math.floor(Math.random() * 5));
  }
  return res;
}

function generateRandomCorrectAnswer() {
  let res = [];
  for (let i = 0; i < 40; ++i) {
    res.push(Math.floor(Math.random() * 4) + 1);
  }
  return res;
}

const correctAnswers = [];
for (let i = 0; i < 4; ++i) {
  correctAnswers.push(generateRandomCorrectAnswer());
}

const data = [
  {
    id: "B21DCCN727",
    name: "Nguyễn Văn A",
    exams: [
      {
        order: 0,
        completed: true,
        date: "2023-04-01",
        answer: generateRandomAnswers(),
      },
      {
        order: 1,
        completed: false,
        date: "2023-08-01",
        answer: generateRandomAnswers(),
      },
      {
        order: 2,
        completed: true,
        date: "2023-12-01",
        answer: generateRandomAnswers(),
      },
      {
        order: 3,
        completed: true,
        date: "2024-03-01",
        answer: generateRandomAnswers(),
      },
    ],
  },
  {
    id: "B21DCCN135",
    name: "Nguyễn Thị B",
    exams: [
      {
        order: 1,
        completed: true,
        date: "2023-08-01",
        answer: generateRandomAnswers(),
      },
      {
        order: 3,
        completed: true,
        date: "2024-03-01",
        answer: generateRandomAnswers(),
      },
    ],
  },
  {
    id: "B21DCCN972",
    name: "Nguyễn Thị B",
    exams: [
      {
        order: 1,
        completed: false,
        date: "2023-08-01",
        answer: generateRandomAnswers(),
      },
      {
        order: 2,
        completed: true,
        date: "2023-12-01",
        answer: generateRandomAnswers(),
      },
      {
        order: 3,
        completed: true,
        date: "2024-03-01",
        answer: generateRandomAnswers(),
      },
    ],
  },
  {
    id: "B21DCCN351",
    name: "Nguyễn Văn D",
    exams: [
      {
        order: 0,
        completed: true,
        date: "2023-04-01",
        answer: generateRandomAnswers(),
      },
      {
        order: 1,
        completed: false,
        date: "2023-08-01",
        answer: generateRandomAnswers(),
      },
    ],
  },
  {
    id: "B21DCCN756",
    name: "Nguyễn Văn A",
    exams: [
      {
        order: 2,
        completed: true,
        date: "2023-12-01",
        answer: generateRandomAnswers(),
      },
      {
        order: 3,
        completed: true,
        date: "2024-03-01",
        answer: generateRandomAnswers(),
      },
    ],
  },
  {
    id: "B21DCCN810",
    name: "Nguyễn Văn F",
    exams: [
      {
        order: 2,
        completed: true,
        date: "2023-12-01",
        answer: generateRandomAnswers(),
      },
      {
        order: 3,
        completed: true,
        date: "2024-03-01",
        answer: generateRandomAnswers(),
      },
    ],
  },
];

const searchInput = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const studentList = document.querySelector(".student-list");

function renderStudent(student, index) {
  studentList.innerHTML += `
    <tr>
      <td>${index + 1}</td>
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td><a onclick="showSdetail(${index})" href="#">Chi tiết</a></td>
    </tr>
  `;
}

function handleSearchBtn() {
  searchBtn.onclick = () => {
    studentList.innerHTML = `
      <tr>
        <th>STT</th>
        <th>Mã sinh viên</th>
        <th>Họ và tên</th>
        <th>Kết quả</th>
      </tr> 
    `;

    const input = searchInput.value;

    if (input.length !== 0) {
      data.forEach((student, index) => {
        if (student.id.includes(input) || student.name.includes(input)) {
          renderStudent(student, index);
        }
      });
    } else {
      data.forEach(renderStudent);
    }
  };
}

const edetail = document.querySelector('.edetail');
const edetailBody = document.querySelector('.edetail__body');
const edetailTitle = document.querySelector('.edetail__title');
const edetailClose = document.querySelector('.edetail__close');
const edetailSubHeader = document.querySelector('.edetail__sub-header');
const edetailContent = document.querySelector('.edetail__content');

function handleCloseEdetail() {
  const closeEdetail = () => {
    edetail.style.display = 'none';
  };

  edetailBody.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  edetailClose.onclick = closeEdetail;
  edetail.onclick = closeEdetail;
}

function showEdetail(order, answer, title) {
  handleCloseEdetail();

  const correctAnswer = correctAnswers[order];

  edetailTitle.innerHTML = title;
  edetailSubHeader.querySelector('h2').innerHTML = `Kỳ thi ${order + 1}`;
  
  let grade = 0;
  edetailContent.innerHTML = '';
  answer.forEach((item, index) => {
    let q = document.createElement('div');
    q.className = `question q${index + 1}`;
    q.innerHTML = `
      <h3 class="question__title">Câu ${index + 1}: sample text</h3>

      <ul class="question__answer-list">
        <li class="question__answer">A. sample text</li>
        <li class="question__answer">B. sample text</li>
        <li class="question__answer">C. sample text</li>
        <li class="question__answer">D. sample text</li>
      </ul>

      <div class="question__explain">Giải thích: sample text</div>
    `;

    if (correctAnswer[index] === item) grade += 0.25;
    q.querySelector(`li:nth-of-type(${correctAnswer[index]})`).classList.add('question__answer--correct');
    if (item !== 0)
      q.querySelector(`li:nth-of-type(${item})`).classList.add('question__answer--user');

    edetailContent.appendChild(q);
  });

  edetailSubHeader.querySelector('p').innerHTML = `Điểm: ${grade}`;
  
  edetail.style.display = 'flex';
}

const sdetail = document.querySelector(".sdetail");
const sdetailBody = document.querySelector(".sdetail__body");
const sdetailClose = document.querySelector(".sdetail__close");
const sdetailContent = document.querySelector(".sdetail__content");

function handleCloseSdetail() {
  sdetailBody.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  let closeSdetail = () => {
    sdetail.style.display = "none";
  };

  sdetail.onclick = closeSdetail;
  sdetailClose.onclick = closeSdetail;
}

function showSdetail(index) {
  handleCloseSdetail();

  const student = data[index];
  const sdetailTitle = document.querySelector(".sdetail__title");
  const title = student.id + " " + student.name;

  sdetailTitle.innerHTML = title;
  sdetailContent.innerHTML = "";
  student.exams.forEach((exam) => {
    let grade = 0;
    let correctAnswer = correctAnswers[exam.order];
    exam.answer.forEach((item, index) => {
      if (item === correctAnswer[index])
        grade += 0.25;
    });

    let date = exam.date;
    sdetailContent.innerHTML += `
      <div class="exam">
        <h3 class="exam__name">Kỳ thi ${exam.order + 1}</h3>
        <div class="exam__grade">Điểm: ${grade}</div>
        <div class="exam__completed">${exam.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}</div>
        <div class="exam__date">Ngày thi: ${date.substring(8)}/${date.substring(5, 7)}/${date.substring(0, 4)}</div>
        <button onclick="showEdetail(${exam.order}, [${exam.answer}], '${title}')">Chi tiết</button>
      </div>
    `;
  });

  sdetail.style.display = "flex";
}

function getPDF() {
  const pdfBtn = document.querySelector('.sdetail__sub-header button');
  pdfBtn.innerHTML = "Vui lòng chờ";

  var HTML_Width = $(".report__body").width();
  var HTML_Height = $(".report__body").height();
  var top_left_margin = 15;
  var PDF_Width = HTML_Width + top_left_margin * 2;
  var PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
  var canvas_image_width = HTML_Width;
  var canvas_image_height = HTML_Height;

  var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

  html2canvas($(".report__body")[0], { allowTaint: true }).then(function (canvas) {
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

    pdf.save("Báo cáo.pdf");
  });
}

function start() {
  studentList.innerHTML = `
    <tr>
      <th>STT</th>
      <th>Mã sinh viên</th>
      <th>Họ và tên</th>
      <th>Kết quả</th>
    </tr> 
  `;
  data.forEach(renderStudent);

  handleSearchBtn();
}

start();
