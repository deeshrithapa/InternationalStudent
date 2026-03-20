const container = document.getElementById("universities-container");
const filter = document.getElementById("countryFilter");

let universitiesData = [];

// Fetch data
fetch("/data/data.json")
  .then((res) => res.json())
  .then((data) => {
    universitiesData = data;
    displayUniversities(data);
    populateFilter(data);
  });

// Display cards
function displayUniversities(data) {
  container.innerHTML = "";

  data.forEach((uni) => {
    const card = document.createElement("div");
    card.classList.add("uni-card");

    card.innerHTML = `
  <img src="${uni.image}" alt="${uni.name}" class="uni-img">

  <div class="uni-content">
    <h3 class="uni-name">${uni.name}</h3>
    <p class="uni-location">${uni.city}, ${uni.country}</p>

    <p class="uni-courses">
      <strong>Available Courses:</strong><br>
      ${uni.courses}
    </p>

    <p class="uni-desc">${uni.description}</p>

    <p class="uni-fee">
      <strong>Tuition:</strong> ${uni.tuition}
    </p>

    <div class="uni-buttons">
      <a href="${uni.website}" target="_blank" class="btn-outline">
        Visit Website 
      </a>
      <button class="btn-primary apply-btn">
        Start Application
      </button>
    </div>
  </div>
`;

    // Button click
    card.querySelector(".apply-btn").addEventListener("click", () => {
      alert(`Application started for ${uni.name}`);
    });
    container.appendChild(card);
  });
}

// Populate dropdown
function populateFilter(data) {
  const countries = [...new Set(data.map((u) => u.country))];

  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    filter.appendChild(option);
  });
}

// Filter logic
filter.addEventListener("change", () => {
  const selected = filter.value;

  if (selected === "all") {
    displayUniversities(universitiesData);
  } else {
    const filtered = universitiesData.filter((u) => u.country === selected);
    displayUniversities(filtered);
  }
});
