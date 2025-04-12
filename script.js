let chaptersData = {
    "Physics": {
      "Class 11": [
        { "name": "Physical world and Measurement", "completed": false },
        { "name": "Kinematics", "completed": false },
        { "name": "Laws of Motion", "completed": false },
        { "name": "Work, Energy and Power", "completed": false },
        { "name": "Motion of System of Particles", "completed": false },
        { "name": "Gravitation", "completed": false },
        { "name": "Properties of Bulk Matter", "completed": false },
        { "name": "Thermodynamics", "completed": false },
        { "name": "Behaviour of Perfect Gas and Kinetic Theory", "completed": false },
        { "name": "Oscillations and Waves", "completed": false }
      ],
      "Class 12": [
        { "name": "Electrostatics", "completed": false },
        { "name": "Current Electricity", "completed": false },
        { "name": "Magnetic Effects of Current", "completed": false },
        { "name": "Electromagnetic Induction", "completed": false },
        { "name": "Alternating Current", "completed": false },
        { "name": "Electromagnetic Waves", "completed": false },
        { "name": "Ray Optics and Optical Instruments", "completed": false },
        { "name": "Wave Optics", "completed": false },
        { "name": "Dual Nature of Matter and Radiation", "completed": false },
        { "name": "Atoms and Nuclei", "completed": false },
        { "name": "Electronic Devices", "completed": false }
      ]
    },
    "Chemistry": {
      "Class 11": [
        { "name": "Some Basic Concepts of Chemistry", "completed": false },
        { "name": "Structure of Atom", "completed": false },
        { "name": "Chemical Bonding and Molecular Structure", "completed": false },
        { "name": "Classification of Elements and Periodicity", "completed": false },
        { "name": "States of Matter", "completed": false },
        { "name": "Thermodynamics", "completed": false },
        { "name": "Equilibrium", "completed": false },
        { "name": "Redox Reaction", "completed": false },
        { "name": "Hydrogen", "completed": false },
        { "name": "The s-Block Element", "completed": false },
        { "name": "Some p-Block Elements", "completed": false },
        { "name": "Organic Chemistry - Basic Principles & Techniques", "completed": false },
        { "name": "Hydrocarbons", "completed": false },
        { "name": "Environmental Chemistry", "completed": false }
      ],
      "Class 12": [
        { "name": "Solid State", "completed": false },
        { "name": "Solutions", "completed": false },
        { "name": "Electrochemistry", "completed": false },
        { "name": "Chemical Kinetics", "completed": false },
        { "name": "Surface Chemistry", "completed": false },
        { "name": "The p-Block Element", "completed": false },
        { "name": "The d- and f-Block Elements", "completed": false },
        { "name": "Coordination Compounds", "completed": false },
        { "name": "Haloalkanes and Haloarenes", "completed": false },
        { "name": "Alcohols, Phenols and Ethers", "completed": false },
        { "name": "Aldehydes, Ketones and Carboxylic Acids", "completed": false },
        { "name": "Organic Compounds containing Nitrogen", "completed": false },
        { "name": "Biomolecules", "completed": false },
        { "name": "Polymers", "completed": false },
        { "name": "Chemistry in Everyday Life", "completed": false }
      ]
    },
    "Biology": {
      "Class 11": [
        { "name": "Diversity of Living Organisms", "completed": false },
        { "name": "Structural Organisation in Animals and Plants", "completed": false },
        { "name": "Cell Structure and Function", "completed": false },
        { "name": "Plant Physiology", "completed": false },
        { "name": "Human Physiology", "completed": false }
      ],
      "Class 12": [
        { "name": "Reproduction", "completed": false },
        { "name": "Genetics and Evolution", "completed": false },
        { "name": "Biology and Human Welfare", "completed": false },
        { "name": "Biotechnology and Its Applications", "completed": false },
        { "name": "Ecology and Environment", "completed": false }
      ]
    }
  };
  // Load saved progress from localStorage
const savedData = localStorage.getItem("chaptersData");
if (savedData) {
  chaptersData = JSON.parse(savedData);
}

function toggleChapterCompleted(subject, std, index) {
  chaptersData[subject][std][index].completed =
    !chaptersData[subject][std][index].completed;
  localStorage.setItem("chaptersData", JSON.stringify(chaptersData));
  renderChapters();
  updateChapterStats();
}

function renderChapters() {
  const container = document.getElementById("chapterContainer");
  container.innerHTML = "";

  for (let subject in chaptersData) {
    const subjectDiv = document.createElement("div");
    subjectDiv.classList.add("subject");

    const subjectTitle = document.createElement("h3");
    subjectTitle.textContent = subject;
    subjectDiv.appendChild(subjectTitle);

    for (let std in chaptersData[subject]) {
      const classDiv = document.createElement("div");
      classDiv.classList.add("standard");

      const classTitle = document.createElement("h4");
      classTitle.textContent = std.toUpperCase();
      classDiv.appendChild(classTitle);

      chaptersData[subject][std].forEach((chapter, index) => {
        const chapterItem = document.createElement("div");
        chapterItem.classList.add("chapter");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = chapter.completed;
        checkbox.onchange = () =>
          toggleChapterCompleted(subject, std, index);

        const label = document.createElement("label");
        label.textContent = chapter.name;

        chapterItem.appendChild(checkbox);
        chapterItem.appendChild(label);
        classDiv.appendChild(chapterItem);
      });

      subjectDiv.appendChild(classDiv);
    }

    container.appendChild(subjectDiv);
  }
}

function updateChapterStats() {
  let total = 0;
  let completed = 0;

  Object.values(chaptersData).forEach(subject =>
    Object.values(subject).forEach(classData => {
      total += classData.length;
      completed += classData.filter(ch => ch.completed).length;
    })
  );

  const leftToday = total - completed;

  const statBox = document.getElementById("chapterStats");
  statBox.innerHTML = `📚 Chapters left to complete: <strong>${leftToday}</strong>`;
}

function resetProgress() {
  Object.values(chaptersData).forEach(subject =>
    Object.values(subject).forEach(classData =>
      classData.forEach(ch => (ch.completed = false))
    )
  );
  localStorage.setItem("chaptersData", JSON.stringify(chaptersData));
  renderChapters();
  updateChapterStats();
}

function displayQuote() {
  const quotes = [
    "Believe in yourself, you’re halfway there!",
    "Little progress each day adds up to big results.",
    "Push yourself, because no one else is going to do it for you.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Success is what comes after you stop making excuses."
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteBox = document.getElementById("quoteContainer");

  quoteBox.innerHTML = `💬 <em>${quotes[randomIndex]}</em>`;
}
function displayCountdown() {
    const examDate = new Date("2025-05-04");
    const today = new Date();
  
    const timeDiff = examDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
    const countdownBox = document.getElementById("countdown");
    countdownBox.innerHTML = `⏳ Days left for NEET: <strong>${daysLeft}</strong>`;
  }
  
  window.onload = function () {
    renderChapters();
    updateChapterStats();
    displayQuote();
    displayCountdown();
  };
  